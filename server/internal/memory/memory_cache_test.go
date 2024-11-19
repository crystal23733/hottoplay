package memory_test

import (
	"server/internal/memory"
	"server/internal/models"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMemoryCache(t *testing.T) {
	// 테스트 데이터 준비
	lottoData := []models.LottoData{
		{DrwNo: 1, DrwtNo1: 1, DrwtNo2: 2, DrwtNo3: 3, DrwtNo4: 4, DrwtNo5: 5, DrwtNo6: 6},
		{DrwNo: 2, DrwtNo1: 7, DrwtNo2: 8, DrwtNo3: 9, DrwtNo4: 10, DrwtNo5: 11, DrwtNo6: 12},
	}

	// MemoryCache 인스턴스 생성
	cache := memory.NewMemoryCache()

	// LoadData 메서드 테스트
	cache.LoadData(lottoData)
	allData := cache.GetAllData()

	assert.Equal(t, 2, len(allData), "로드된 데이터의 개수가 맞지 않습니다")
	assert.Equal(t, lottoData, allData, "로드된 데이터가 원본과 일치하지 않습니다")

	// GetDataByRound 메서드 테스트
	roundData := cache.GetDataByRound(1)
	assert.NotNil(t, roundData, "1회차 데이터를 찾지 못했습니다")
	assert.Equal(t, 1, roundData.DrwNo, "1회차 데이터의 DrwNo가 올바르지 않습니다")

	// 존재하지 않는 회차 데이터 테스트
	nonExistentData := cache.GetDataByRound(3)
	assert.Nil(t, nonExistentData, "존재하지 않는 회차 데이터가 반환되었습니다")
}
