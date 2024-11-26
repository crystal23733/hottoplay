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
	"server/internal/models"
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
	GenerateUniqueNumbers() ([]int, error)
	GeneratePopularBasedNumbers() []int
	GetRoundNumbers(round int) (*models.LottoRoundData, error)
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

// GetRoundNumbers는 특정 회차의 로또 데이터를 반환합니다.
func (s *LottoService) GetRoundNumbers(round int) (*models.LottoRoundData, error) {
	if round <= 0 {
		return nil, fmt.Errorf("유효하지 않은 회차 번호입니다: %d", round)
	}

	data := s.cache.GetDataByRound(round)
	if data == nil {
		return nil, fmt.Errorf("%d회차 데이터를 찾을 수 없습니다", round)
	}

	return &models.LottoRoundData{
		TotSellamnt:    data.TotSellamnt,
		FirstWinamnt:   data.FirstWinamnt,
		DrwNo:          data.DrwNo,
		Numbers:        []int{data.DrwtNo1, data.DrwtNo2, data.DrwtNo3, data.DrwtNo4, data.DrwtNo5, data.DrwtNo6},
		BnusNo:         data.BnusNo,
		FirstPrzwnerCo: data.FirstPrzwnerCo,
		FirstAccumamnt: data.FirstAccumamnt,
		DrwNoDate:      data.DrwNoDate,
		ReturnValue:    data.ReturnValue,
	}, nil
}
