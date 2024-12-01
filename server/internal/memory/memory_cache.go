package memory

import (
	"server/internal/models"
	"sync"
)

// MemoryCache는 로또 데이터를 메모리에 캐싱하는 구조체입니다.
type MemoryCache struct {
	mu              sync.RWMutex
	data            []models.LottoData
	roundMap        map[int]*models.LottoData // 회차별 빠른 검색을 위한 맵
	numberFrequency map[int]int               // 번호별 출현 빈도
}

// NewMemoryCache는 새로운 MemoryCache 인스턴스를 생성합니다.
func NewMemoryCache() *MemoryCache {
	return &MemoryCache{
		data:            make([]models.LottoData, 0),
		roundMap:        make(map[int]*models.LottoData),
		numberFrequency: make(map[int]int),
	}
}

// LoadData는 로또 데이터를 메모리에 로드합니다.
func (mc *MemoryCache) LoadData(data []models.LottoData) {
	mc.mu.Lock()
	defer mc.mu.Unlock()

	mc.data = data

	// 회차별 맵과 번호 빈도수 초기화
	mc.roundMap = make(map[int]*models.LottoData)
	mc.numberFrequency = make(map[int]int)

	// 데이터 인덱싱
	for i := range data {
		mc.roundMap[data[i].DrwNo] = &data[i]

		numbers := []int{
			data[i].DrwtNo1, data[i].DrwtNo2, data[i].DrwtNo3,
			data[i].DrwtNo4, data[i].DrwtNo5, data[i].DrwtNo6,
		}
		for _, num := range numbers {
			mc.numberFrequency[num]++
		}
	}
}

// GetAllData는 저장된 모든 로또 데이터를 반환합니다.
func (mc *MemoryCache) GetAllData() []models.LottoData {
	mc.mu.RLock()
	defer mc.mu.RUnlock()
	return mc.data
}

// GetDataByRound는 특정 회차의 로또 데이터를 반환합니다.
func (mc *MemoryCache) GetDataByRound(round int) *models.LottoData {
	mc.mu.RLock()
	defer mc.mu.RUnlock()
	return mc.roundMap[round]
}

// GetNumberFrequency는 각 번호별 출현 빈도를 반환합니다.
func (mc *MemoryCache) GetNumberFrequency() map[int]int {
	mc.mu.RLock()
	defer mc.mu.RUnlock()

	freq := make(map[int]int)
	for k, v := range mc.numberFrequency {
		freq[k] = v
	}
	return freq
}
