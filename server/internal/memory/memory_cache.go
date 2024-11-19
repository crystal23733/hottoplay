package memory

import (
	"server/internal/models"
	"sync"
)

// MemoryCache는 메모리에 데이터를 캐싱하고 관리한다.
type MemoryCache struct {
	mu   sync.RWMutex
	data []models.LottoData
}

// NewMemoryCache는 MemoryCache 인스턴스를 생성한다.
func NewMemoryCache() *MemoryCache {
	return &MemoryCache{
		data: make([]models.LottoData, 0),
	}
}

// LoadData는 메모리에 데이터를 로드한다.
func (mc *MemoryCache) LoadData(data []models.LottoData) {
	mc.mu.Lock()
	defer mc.mu.Unlock()
	mc.data = data
}

// GetAllData는 메모리에 저장된 모든 데이터를 반환합니다.
func (mc *MemoryCache) GetAllData() []models.LottoData {
	mc.mu.RLock()
	defer mc.mu.RUnlock()
	return mc.data
}

// GetDataByRound는 특정 회차 데이터를 반환합니다.
func (mc *MemoryCache) GetDataByRound(round int) *models.LottoData {
	mc.mu.RLock()
	defer mc.mu.RUnlock()
	for _, d := range mc.data {
		if d.DrwNo == round {
			return &d
		}
	}
	return nil
}
