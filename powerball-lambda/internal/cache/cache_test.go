package cache

import (
	"powerball-lambda/internal/models"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCache(t *testing.T) {
	// 테스트용 데이터 생성
	testData := []models.PowerballDraw{
		{
			Date:         "2025-02-05",
			WhiteNumbers: []string{"19", "27", "30", "50", "62"},
			Powerball:    "14",
			PowerPlay:    "3x",
			Era:          "current",
			Rules: models.Rules{
				WhiteBallRange: []int{1, 69},
				PowerBallRange: []int{1, 26},
			},
		},
	}

	t.Run("기본 캐시 동작", func(t *testing.T) {
		cache := NewCache(1 * time.Hour)

		// 캐시 설정
		cache.Set(testData)

		// 캐시 조회
		data, valid := cache.Get()
		assert.True(t, valid, "캐시는 유효해야 합니다")
		assert.Equal(t, testData, data, "캐시된 데이터가 일치해야 합니다")
	})

	t.Run("캐시 만료", func(t *testing.T) {
		cache := NewCache(1 * time.Millisecond)
		cache.Set(testData)

		// 캐시 만료 대기
		time.Sleep(2 * time.Millisecond)

		// 만료된 캐시 조회
		_, valid := cache.Get()
		assert.False(t, valid, "캐시는 만료되어야 합니다")
	})

	t.Run("캐시 초기화", func(t *testing.T) {
		cache := NewCache(1 * time.Hour)
		cache.Set(testData)

		// 캐시 초기화
		cache.Clear()

		// 초기화된 캐시 조회
		data, valid := cache.Get()
		assert.False(t, valid, "캐시는 유효하지 않아야 합니다")
		assert.Nil(t, data, "캐시된 데이터가 없어야 합니다")
	})
}
