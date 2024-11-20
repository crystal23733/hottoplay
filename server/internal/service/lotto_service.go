package service

import (
	"context"
	"fmt"
	"math/rand"
	"sort"
	"strings"
	"sync"
	"time"

	"server/internal/memory"
	"server/internal/s3"
)

// LottoService는 로또 번호 생성 및 조회 기능을 제공하는 서비스입니다.
type LottoService struct {
	cache    *memory.MemoryCache
	s3Client s3.S3ClientInterface
	rng      *rand.Rand
}

// LottoServiceInterface는 로또 서비스의 인터페이스를 정의합니다.
type LottoServiceInterface interface {
	GenerateRandomNumbers() []int
	GenerateUniqueNumbers() ([]int, error)
	GeneratePopularBasedNumbers() []int
	GenerateUserBasedNumbers(numbers []int) ([]int, error)
}

// NewLottoService는 새로운 LottoService 인스턴스를 생성합니다.
func NewLottoService(cache *memory.MemoryCache, s3Client s3.S3ClientInterface) *LottoService {
	source := rand.NewSource(time.Now().UnixNano())
	return &LottoService{
		cache:    cache,
		s3Client: s3Client,
		rng:      rand.New(source),
	}
}

// InitializeData는 S3에서 데이터를 로드하여 메모리에 초기화합니다.
func (s *LottoService) InitializeData(ctx context.Context) error {
	data, err := s.s3Client.LoadLottoData(ctx)
	if err != nil {
		return fmt.Errorf("S3 데이터 로드 실패: %v", err)
	}
	s.cache.LoadData(data)
	return nil
}

// GenerateUniqueNumbers는 지금까지 나오지 않은 새로운 번호 조합을 생성합니다.
func (s *LottoService) GenerateUniqueNumbers() ([]int, error) {
	allData := s.cache.GetAllData()
	existingNumbers := make(map[string]bool)

	for _, d := range allData {
		numbers := []int{d.DrwtNo1, d.DrwtNo2, d.DrwtNo3, d.DrwtNo4, d.DrwtNo5, d.DrwtNo6}
		sort.Ints(numbers)
		key := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(numbers)), ","), "[]")
		existingNumbers[key] = true
	}

	numWorkers := 4
	resultChan := make(chan []int)
	stopChan := make(chan struct{})

	var wg sync.WaitGroup
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go func() {
			localRng := rand.New(rand.NewSource(time.Now().UnixNano()))
			defer wg.Done()
			for {
				select {
				case <-stopChan:
					return
				default:
					numbers := s.generateRandomNumbersWithRng(localRng)
					key := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(numbers)), ","), "[]")
					if !existingNumbers[key] {
						resultChan <- numbers
						return
					}
				}
			}
		}()
	}

	go func() {
		wg.Wait()
		close(resultChan)
	}()

	result := <-resultChan
	close(stopChan)
	return result, nil
}

// GeneratePopularBasedNumbers는 가장 많이 나온 번호들로 조합을 생성합니다.
func (s *LottoService) GeneratePopularBasedNumbers() []int {
	freq := s.cache.GetNumberFrequency()

	type numberFreq struct {
		Number int
		Freq   int
	}

	var freqList []numberFreq
	for number, freq := range freq {
		freqList = append(freqList, numberFreq{Number: number, Freq: freq})
	}

	sort.Slice(freqList, func(i, j int) bool {
		return freqList[i].Freq > freqList[j].Freq
	})

	popularNumbers := make([]int, 0, 6)
	for i := 0; i < 6 && i < len(freqList); i++ {
		popularNumbers = append(popularNumbers, freqList[i].Number)
	}

	sort.Ints(popularNumbers)
	return popularNumbers
}

// GenerateUserBasedNumbers는 사용자가 선택한 번호를 포함한 조합을 생성합니다.
func (s *LottoService) GenerateUserBasedNumbers(userNumbers []int) ([]int, error) {
	// 사용자 입력 번호 검증
	if len(userNumbers) == 0 {
		return nil, fmt.Errorf("최소 1개 이상의 번호를 선택해야 합니다")
	}
	if len(userNumbers) > 5 {
		return nil, fmt.Errorf("최대 5개까지 번호를 선택할 수 있습니다")
	}

	// 번호 범위 검증
	for _, num := range userNumbers {
		if num < 1 || num > 45 {
			return nil, fmt.Errorf("선택한 번호는 1부터 45 사이여야 합니다: %d", num)
		}
	}

	// 중복 번호 검증
	numMap := make(map[int]bool)
	for _, num := range userNumbers {
		if numMap[num] {
			return nil, fmt.Errorf("중복된 번호가 있습니다: %d", num)
		}
		numMap[num] = true
	}

	// 남은 번호 풀 생성
	availableNumbers := make([]int, 0)
	for i := 1; i <= 45; i++ {
		if !numMap[i] {
			availableNumbers = append(availableNumbers, i)
		}
	}

	// 필요한 만큼의 추가 번호 생성
	result := make([]int, len(userNumbers))
	copy(result, userNumbers)

	// Fisher-Yates 셔플 알고리즘으로 남은 번호들을 섞음
	for i := len(availableNumbers) - 1; i > 0; i-- {
		j := s.rng.Intn(i + 1)
		availableNumbers[i], availableNumbers[j] = availableNumbers[j], availableNumbers[i]
	}

	// 필요한 만큼만 추가
	remainingCount := 6 - len(userNumbers)
	result = append(result, availableNumbers[:remainingCount]...)

	// 최종 번호 정렬
	sort.Ints(result)
	return result, nil
}

// GenerateRandomNumbers는 완전히 무작위로 번호를 생성합니다.
func (s *LottoService) GenerateRandomNumbers() []int {
	return s.generateRandomNumbersWithRng(s.rng)
}

// generateRandomNumbersWithRng는 주어진 난수 생성기로 번호를 생성합니다.
func (s *LottoService) generateRandomNumbersWithRng(rng *rand.Rand) []int {
	numbers := make([]int, 6)
	for i := range numbers {
		numbers[i] = rng.Intn(45) + 1
	}
	sort.Ints(numbers)
	return numbers
}

// contains는 배열에 특정 숫자가 포함되어 있는지 확인합니다.
func contains(arr []int, num int) bool {
	for _, n := range arr {
		if n == num {
			return true
		}
	}
	return false
}
