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

type numberFrequency struct {
	Number int
	Freq   int
}

// LottoServiceInterface는 로또 서비스의 인터페이스를 정의합니다.
type LottoServiceInterface interface {
	GenerateUniqueNumbers() ([]int, error)
	GeneratePopularBasedNumbers() []int
	GetRoundNumbers(round int) (*models.LottoRoundData, error)
	GetPopularWatch(popular string) ([]*models.PopularResponse, error)
	GenerateStatisticsBasedNumbers(statisticsType string) ([]int, error)
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

// GetSortedFrequencies는 번호 빈도수 맵을 받아서 정렬된 NumberFrequency 슬라이스를 반환합니다.
func (s *LottoService) GetSortedFrequencies(frequencies map[int]int) []numberFrequency {
	// 빈도수 맵을 슬라이스로 변환
	freqList := make([]numberFrequency, 0, len(frequencies))

	for num, count := range frequencies {
		freqList = append(freqList, numberFrequency{
			Number: num,
			Freq:   count,
		})
	}

	// 빈도수 내림차순, 같은 빈도수는 번호 오름차순 정렬
	sort.Slice(freqList, func(i, j int) bool {
		if freqList[i].Freq == freqList[j].Freq {
			return freqList[i].Freq < freqList[j].Freq
		}
		return freqList[i].Freq > freqList[j].Freq
	})

	return freqList
}

// GetPopularWatch는 번호를 빈도수별로 내림차순 합니다.
func (s *LottoService) GetPopularWatch(popular string) ([]*models.PopularResponse, error) {
	freq := s.cache.GetNumberFrequency()

	// 정렬된 빈도수 얻기
	sortedFreq := s.GetSortedFrequencies(freq)

	// 결과 배열 생성
	result := make([]*models.PopularResponse, len(sortedFreq))

	// 정렬된 데이터를 PopularResponse 타입으로 변환
	for i, sf := range sortedFreq {
		result[i] = &models.PopularResponse{
			Numbers: sf.Number,
			Freq:    sf.Freq,
		}
	}
	return result, nil
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

	// 정렬된 빈도수 얻기
	sortedFreq := s.GetSortedFrequencies(freq)

	popularNumbers := make([]int, 0, 6)
	for i := 0; i < 6 && i < len(sortedFreq); i++ {
		popularNumbers = append(popularNumbers, sortedFreq[i].Number)
	}

	sort.Ints(popularNumbers)
	return popularNumbers
}

// generateRandomNumbersWithRng는 주어진 난수 생성기로 번호를 생성합니다.
func (s *LottoService) generateRandomNumbersWithRng(rng *rand.Rand) []int {
	numbers := make([]int, 0, 6)
	used := make(map[int]bool)
	for len(numbers) < 6 {
		num := rng.Intn(45) + 1
		// 아직 사용되지 않은 번호만 추가
		if !used[num] {
			numbers = append(numbers, num)
			used[num] = true
		}
	}
	sort.Ints(numbers)
	return numbers
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

// GenerateStatisticsBasedNumbers는 통계를 기반으로 번호를 생성합니다.
func (s *LottoService) GenerateStatisticsBasedNumbers(statisticsType string) ([]int, error) {
	freq := s.cache.GetNumberFrequency()
	sortedFreq := s.GetSortedFrequencies(freq)

	switch statisticsType {
	case "hot":
		// 상위 20% (9개) 중에서 3개 + 중간 50% (23개) 중에서 3개 선택
		// 이렇게 하면 너무 편중되지 않고 적절히 분산된 번호 조합이 생성됨
		topNumbers := s.selectFromRange(sortedFreq, 0, 9, 3)
		middleNumbers := s.selectFromRange(sortedFreq, 9, 32, 3)
		result := append(topNumbers, middleNumbers...)
		sort.Ints(result)
		return result, nil

	case "cold":
		// 최근 50회차 동안 가장 적게 나온 번호들 중에서 선택
		recentFreq := s.getRecentFrequency(50)
		coldNumbers := s.GetSortedFrequencies(recentFreq)
		return s.selectFromTopNumbers(reverseSlice(coldNumbers), 15, 6), nil

	case "balanced":
		// 각 구간(1-15, 16-30, 31-45)별로 2개씩 선택하되,
		// 출현 빈도를 가중치로 활용
		return s.generateBalancedNumbers(sortedFreq), nil

	case "weighted":
		// 전체 출현 빈도를 가중치로 사용하여 완전 랜덤이 아닌
		// 확률적으로 더 자주 나온 번호가 선택될 가능성이 높게
		return s.generateWeightedNumbers(sortedFreq), nil

	default:
		return nil, fmt.Errorf("지원하지 않는 통계 타입입니다: %s", statisticsType)
	}
}

// 최근 N회차의 빈도수를 계산
func (s *LottoService) getRecentFrequency(recentN int) map[int]int {
	freq := make(map[int]int)
	data := s.cache.GetAllData()

	if len(data) < recentN {
		recentN = len(data)
	}

	// 최근 N회차 데이터만 사용
	recentData := data[len(data)-recentN:]

	for _, d := range recentData {
		numbers := []int{d.DrwtNo1, d.DrwtNo2, d.DrwtNo3, d.DrwtNo4, d.DrwtNo5, d.DrwtNo6}
		for _, num := range numbers {
			freq[num]++
		}
	}

	return freq
}

// 균형잡힌 번호 생성 (구간별 선택)
func (s *LottoService) generateBalancedNumbers(freqList []numberFrequency) []int {
	if len(freqList) < 45 { // 최소한 1-45까지의 번호가 있어야 함
		return s.generateRandomNumbersWithRng(s.rng) // 대체 로직
	}

	result := make([]int, 0, 6)
	ranges := [][2]int{{1, 15}, {16, 30}, {31, 45}}

	for _, r := range ranges {
		// 각 구간에서 2개씩 선택
		rangeNumbers := make([]numberFrequency, 0)
		for _, nf := range freqList {
			if nf.Number >= r[0] && nf.Number <= r[1] {
				rangeNumbers = append(rangeNumbers, nf)
			}
		}

		selected := s.selectFromTopNumbers(rangeNumbers, len(rangeNumbers), 2)
		result = append(result, selected...)
	}

	sort.Ints(result)
	return result
}

// selectFromRange는 주어진 범위의 번호들 중에서 지정된 개수만큼 선택합니다.
func (s *LottoService) selectFromRange(freqList []numberFrequency, start, end, count int) []int {
	if end > len(freqList) {
		end = len(freqList)
	}
	if start >= end {
		return []int{}
	}

	pool := freqList[start:end]
	selected := make([]int, 0, count)

	for len(selected) < count {
		idx := s.rng.Intn(len(pool))
		num := pool[idx].Number
		if !contains(selected, num) {
			selected = append(selected, num)
		}
	}

	sort.Ints(selected)
	return selected
}

// generateWeightedNumbers는 빈도수를 가중치로 사용하여 번호를 생성합니다.
func (s *LottoService) generateWeightedNumbers(freqList []numberFrequency) []int {
	selected := make([]int, 0, 6)
	totalWeight := 0

	// 전체 가중치 계산
	for _, nf := range freqList {
		totalWeight += nf.Freq
	}

	// 가중치 기반으로 6개 번호 선택
	for len(selected) < 6 {
		// 0부터 전체 가중치 사이의 랜덤 값 생성
		weight := s.rng.Intn(totalWeight)
		accumWeight := 0

		// 누적 가중치를 사용하여 번호 선택
		for _, nf := range freqList {
			accumWeight += nf.Freq
			if weight < accumWeight {
				if !contains(selected, nf.Number) {
					selected = append(selected, nf.Number)
				}
				break
			}
		}
	}

	sort.Ints(selected)
	return selected
}

// contains는 슬라이스에 특정 숫자가 포함되어 있는지 확인합니다.
func contains(numbers []int, num int) bool {
	for _, n := range numbers {
		if n == num {
			return true
		}
	}
	return false
}

// reverseSlice는 numberFrequency 슬라이스를 역순으로 정렬합니다.
func reverseSlice(slice []numberFrequency) []numberFrequency {
	reversed := make([]numberFrequency, len(slice))
	copy(reversed, slice)

	for i := 0; i < len(reversed)/2; i++ {
		j := len(reversed) - 1 - i
		reversed[i], reversed[j] = reversed[j], reversed[i]
	}

	return reversed
}

// selectFromTopNumbers는 주어진 빈도 리스트에서 상위 N개 중에서 M개를 선택합니다.
func (s *LottoService) selectFromTopNumbers(freqList []numberFrequency, poolSize, selectCount int) []int {
	if len(freqList) == 0 || poolSize <= 0 || selectCount <= 0 {
		return []int{}
	}

	// poolSize가 리스트 길이보다 크면 전체 리스트 사용
	if poolSize > len(freqList) {
		poolSize = len(freqList)
	}

	// 결과를 저장할 슬라이스
	selected := make([]int, 0, selectCount)

	// 선택 풀 생성 (상위 N개)
	pool := freqList[:poolSize]

	// selectCount개의 번호를 선택
	for len(selected) < selectCount {
		// 풀에서 랜덤하게 하나 선택
		idx := s.rng.Intn(len(pool))
		num := pool[idx].Number

		// 중복 체크 후 추가
		if !contains(selected, num) {
			selected = append(selected, num)
		}
	}

	// 정렬 후 반환
	sort.Ints(selected)
	return selected
}
