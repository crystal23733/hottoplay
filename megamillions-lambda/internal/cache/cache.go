package cache

import (
	"megamillions-lambda/internal/models"
	"sync"
	"time"
)

// Cache는 메가밀리언 추첨 데이터를 캐싱하는 구조체입니다.
type Cache struct {
	draws        []models.MegaMillionsDraw
	allDraws     []models.MegaMillionsDraw
	mu           sync.RWMutex
	lastUpdated  time.Time
	cachePeriod  time.Duration
	eraRules     map[string]models.Rules
	currentRules models.Rules
}

// NewCache는 새로운 Cache 인스턴스를 생성합니다.
func NewCache(cachePeriod time.Duration) *Cache {
	return &Cache{
		draws:       make([]models.MegaMillionsDraw, 0),
		allDraws:    make([]models.MegaMillionsDraw, 0),
		lastUpdated: time.Now(),
		cachePeriod: cachePeriod,
		eraRules:    make(map[string]models.Rules),
	}
}

// Set은 최근 회차(기본 데이터)를 캐시에 저장합니다.
func (c *Cache) Set(draws []models.MegaMillionsDraw) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.draws = draws
	c.lastUpdated = time.Now()

	// 현재 규칙 설정
	if len(draws) > 0 {
		c.currentRules = draws[0].Rules
	}
}

// SetAllDraws는 모든 시대의 회차 데이터를 캐시에 저장합니다.
func (c *Cache) SetAllDraws(draws []models.MegaMillionsDraw) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.allDraws = draws

	// 각 시대별 규칙 맵 구성
	c.eraRules = make(map[string]models.Rules)
	for _, draw := range draws {
		if _, exists := c.eraRules[draw.Era]; !exists {
			c.eraRules[draw.Era] = draw.Rules
		}
	}
}

// Get은 최근 회차 데이터를 반환합니다.
func (c *Cache) Get() ([]models.MegaMillionsDraw, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	// 캐시 만료 여부 확인
	if time.Since(c.lastUpdated) > c.cachePeriod {
		return nil, false
	}

	if len(c.draws) == 0 {
		return nil, false
	}

	return c.draws, true
}

// GetAllDraws는 모든 시대의 회차 데이터를 반환합니다.
func (c *Cache) GetAllDraws() ([]models.MegaMillionsDraw, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	if time.Since(c.lastUpdated) > c.cachePeriod {
		return nil, false
	}

	if len(c.allDraws) == 0 {
		return nil, false
	}

	return c.allDraws, true
}

// GetEraRules는 특정 시대의 규칙을 반환합니다.
func (c *Cache) GetEraRules(era string) (models.Rules, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	rules, exists := c.eraRules[era]
	return rules, exists
}

// GetCurrentRules는 현재 적용 중인 규칙을 반환합니다.
func (c *Cache) GetCurrentRules() (models.Rules, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	if c.currentRules.WhiteBallRange == nil || len(c.currentRules.WhiteBallRange) != 2 {
		return models.Rules{}, false
	}

	return c.currentRules, true
}
