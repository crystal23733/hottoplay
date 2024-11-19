package service

import (
	"fmt"
	"math/rand"
	"server/internal/memory"
	"server/internal/models"
	"sort"
	"strings"
)

// LottoService는 로또 번호 생성 및 조회 로직을 제공한다.
type LottoService struct {
	cache *memory.MemoryCache
}

// NewLottoService는 LottoService 인스턴스를 생성한다.
func NewLottoService(cache *memory.MemoryCache) *LottoService {
	return &LottoService{cache: cache}
}

// InitializeData는 S3에서 데이터를 로드하여 메모리에 저장한다.
func (s *LottoService) InitializeData(data []models.LottoData) {
	s.cache.LoadData(data)
}

// GenerateUniqueNumbers는 나온 적 없는 번호 조합을 생성한다.
func (s *LottoService) GenerateUniqueNumbers() ([]int, error) {
	allData := s.cache.GetAllData()

	existingNumbers := make(map[string]bool)
	for _, d := range allData {
		numbers := []int{d.DrwtNo1, d.DrwtNo2, d.DrwtNo3, d.DrwtNo4, d.DrwtNo5, d.DrwtNo6}
		sort.Ints(numbers)
		key := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(numbers)), ","), "[]")
		existingNumbers[key] = true
	}

	var generated []int
	for {
		generated = s.generateRandomNumbers()
		key := strings.Trim(strings.Join(strings.Fields(fmt.Sprint(generated)), ","), "[]")
		if !existingNumbers[key] {
			break
		}
	}
	return generated, nil
}

// GeneratePopularBasedNumbers는 가장 많이 나온 번호를 기반으로 조합을 생성한다.
func (s *LottoService) GeneratePopularBasedNumbers() []int {
	numberFrequency := make(map[int]int)
	for _, d := range s.cache.GetAllData() {
		numbers := []int{d.DrwtNo1, d.DrwtNo2, d.DrwtNo3, d.DrwtNo4, d.DrwtNo5, d.DrwtNo6}
		for _, n := range numbers {
			numberFrequency[n]++
		}
	}

	// 빈도수 기준으로 번호 정렬
	type numberFreq struct {
		Number int
		Freq   int
	}
	var freqList []numberFreq
	for number, freq := range numberFrequency {
		freqList = append(freqList, numberFreq{Number: number, Freq: freq})
	}
	sort.Slice(freqList, func(i, j int) bool {
		return freqList[i].Freq > freqList[j].Freq
	})

	// 상위 6개의 번호를 선택
	popularNumbers := make([]int, 0, 6)
	for i := 0; i < 6 && i < len(freqList); i++ {
		popularNumbers = append(popularNumbers, freqList[i].Number)
	}

	return popularNumbers
}

// GenerateUserBasedNumbers는 사용자가 선택한 번호를 포함하여 조합을 생성한다.
func (s *LottoService) GenerateUserBasedNumbers(userNumbers []int) ([]int, error) {
	if len(userNumbers) > 6 {
		return nil, fmt.Errorf("사용자가 선택한 번호는 최대 6개여야 합니다")
	}

	availableNumbers := make([]int, 0)
	for i := 1; i <= 45; i++ {
		if !contains(userNumbers, i) {
			availableNumbers = append(availableNumbers, i)
		}
	}

	// 나머지 번호를 랜덤으로 선택
	for len(userNumbers) < 6 {
		index := rand.Intn(len(availableNumbers))
		userNumbers = append(userNumbers, availableNumbers[index])
		availableNumbers = append(availableNumbers[:index], availableNumbers[index+1:]...)
	}

	sort.Ints(userNumbers)
	return userNumbers, nil
}

// generateRandomNumbers는 무작위 번호 조합을 생성한다.
func (s *LottoService) generateRandomNumbers() []int {
	numbers := rand.Perm(45)[:6]
	sort.Ints(numbers)
	return numbers
}

// contains는 숫자가 배열에 포함되어 있는지 확인한다.
func contains(arr []int, num int) bool {
	for _, n := range arr {
		if n == num {
			return true
		}
	}
	return false
}
