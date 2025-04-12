package cache

import (
	"megamillions-lambda/internal/models"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

// 테스트용 MegaMillionsDraw 생성 헬퍼 함수
func createTestDraw(date string, era string) models.MegaMillionsDraw {
	return models.MegaMillionsDraw{
		Date:         date,
		WhiteNumbers: []int{1, 2, 3, 4, 5},
		MegaBall:     10,
		Era:          era,
		Rules: models.Rules{
			WhiteBallRange: []int{1, 70},
			MegaBallRange:  []int{1, 25},
			StartDate:      "2017-10-31",
		},
	}
}

func TestNewCache(t *testing.T) {
	cachePeriod := 30 * time.Minute
	cache := NewCache(cachePeriod)

	assert.NotNil(t, cache)
	assert.Empty(t, cache.draws)
	assert.Empty(t, cache.allDraws)
	assert.Equal(t, cachePeriod, cache.cachePeriod)
	assert.NotNil(t, cache.eraRules)
}

func TestCacheSetAndGet(t *testing.T) {
	cache := NewCache(30 * time.Minute)

	// 테스트 데이터 생성
	draws := []models.MegaMillionsDraw{
		createTestDraw("2023-01-01", "current"),
		createTestDraw("2022-12-30", "current"),
	}

	// 캐시에 데이터 설정
	cache.Set(draws)

	// 데이터 가져오기
	cachedDraws, ok := cache.Get()

	assert.True(t, ok)
	assert.Equal(t, draws, cachedDraws)

	// 현재 규칙 확인
	rules, ok := cache.GetCurrentRules()
	assert.True(t, ok)
	assert.Equal(t, draws[0].Rules, rules)
}

func TestCacheSetAllDrawsAndGetAllDraws(t *testing.T) {
	cache := NewCache(30 * time.Minute)

	// 다양한 시대의 테스트 데이터 생성
	allDraws := []models.MegaMillionsDraw{
		createTestDraw("2023-01-01", "current"),
		createTestDraw("2017-10-31", "2017-2023"),
		createTestDraw("2013-10-22", "2013-2017"),
	}

	// 캐시에 데이터 설정
	cache.SetAllDraws(allDraws)

	// 데이터 가져오기
	cachedAllDraws, ok := cache.GetAllDraws()

	assert.True(t, ok)
	assert.Equal(t, allDraws, cachedAllDraws)

	// 시대별 규칙 확인
	currentRules, ok := cache.GetEraRules("current")
	assert.True(t, ok)
	assert.Equal(t, allDraws[0].Rules, currentRules)

	era2017Rules, ok := cache.GetEraRules("2017-2023")
	assert.True(t, ok)
	assert.Equal(t, allDraws[1].Rules, era2017Rules)
}

func TestCacheExpiration(t *testing.T) {
	// 짧은 캐시 기간 설정
	cache := NewCache(50 * time.Millisecond)

	draws := []models.MegaMillionsDraw{
		createTestDraw("2023-01-01", "current"),
	}

	cache.Set(draws)
	cache.SetAllDraws(draws)

	// 캐시 만료 전에는 데이터를 가져올 수 있어야 함
	cachedDraws, ok := cache.Get()
	assert.True(t, ok)
	assert.Equal(t, draws, cachedDraws)

	// 캐시 만료 시간까지 대기
	time.Sleep(100 * time.Millisecond)

	// 만료 후에는 데이터를 가져올 수 없어야 함
	cachedDraws, ok = cache.Get()
	assert.False(t, ok)
	assert.Nil(t, cachedDraws)

	allDraws, ok := cache.GetAllDraws()
	assert.False(t, ok)
	assert.Nil(t, allDraws)
}

func TestGetEraRulesNotFound(t *testing.T) {
	cache := NewCache(30 * time.Minute)

	// 존재하지 않는 시대 규칙 조회
	rules, ok := cache.GetEraRules("non-existent-era")

	assert.False(t, ok)
	assert.Empty(t, rules)
}

func TestGetCurrentRulesEmpty(t *testing.T) {
	cache := NewCache(30 * time.Minute)

	// 규칙이 설정되지 않은 상태에서 현재 규칙 조회
	rules, ok := cache.GetCurrentRules()

	assert.False(t, ok)
	assert.Empty(t, rules)
}
