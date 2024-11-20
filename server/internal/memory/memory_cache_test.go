package memory

import (
	"reflect"
	"server/internal/models"
	"testing"
)

func TestMemoryCache(t *testing.T) {
	// 테스트 데이터 준비
	testData := []models.LottoData{
		{
			DrwNo:   1,
			DrwtNo1: 1, DrwtNo2: 2, DrwtNo3: 3,
			DrwtNo4: 4, DrwtNo5: 5, DrwtNo6: 6,
		},
		{
			DrwNo:   2,
			DrwtNo1: 7, DrwtNo2: 8, DrwtNo3: 9,
			DrwtNo4: 10, DrwtNo5: 11, DrwtNo6: 12,
		},
	}

	t.Run("NewMemoryCache", func(t *testing.T) {
		cache := NewMemoryCache()
		if cache == nil {
			t.Error("NewMemoryCache() returned nil")
		}
	})

	t.Run("LoadData and GetAllData", func(t *testing.T) {
		cache := NewMemoryCache()
		cache.LoadData(testData)

		got := cache.GetAllData()
		if !reflect.DeepEqual(got, testData) {
			t.Errorf("GetAllData() = %v, want %v", got, testData)
		}
	})

	t.Run("GetDataByRound", func(t *testing.T) {
		cache := NewMemoryCache()
		cache.LoadData(testData)

		got := cache.GetDataByRound(1)
		if got == nil || got.DrwNo != 1 {
			t.Errorf("GetDataByRound(1) = %v, want round 1", got)
		}
	})

	t.Run("GetNumberFrequency", func(t *testing.T) {
		cache := NewMemoryCache()
		cache.LoadData(testData)

		freq := cache.GetNumberFrequency()
		expectedFreq := map[int]int{
			1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1,
			7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1,
		}

		if !reflect.DeepEqual(freq, expectedFreq) {
			t.Errorf("GetNumberFrequency() = %v, want %v", freq, expectedFreq)
		}
	})
}
