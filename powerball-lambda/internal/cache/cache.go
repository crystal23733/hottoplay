package cache

import (
	"powerball-lambda/internal/models"
	"sync"
	"time"
)

// Cache는 파워볼 데이터의 메모리 캐시를 관리하는 구조체입니다.
type Cache struct {
	// draws는 파워볼 추첨 결과들을 저장합니다.
	draws []models.PowerballDraw

	// lastUpdated는 마지막 업데이트 시간을 저장합니다.
	lastUpdated time.Time

	// ttl은 캐시의 유효 기간입니다.
	ttl time.Duration

	// mutex는 동시성 제어를 위한 뮤텍스입니다.
	mutex sync.RWMutex
}

// NewCache는 새로운 Cache 인스턴스를 생성합니다.
//
// ttl 매개변수는 캐시의 유효 기간을 지정합니다.
func NewCache(ttl time.Duration) *Cache {
	return &Cache{
		ttl: ttl,
	}
}

// Set은 캐시에 새로운 데이터를 저장합니다.
//
// draws 매개변수는 저장할 파워볼 추첨 결과들입니다.
func (c *Cache) Set(draws []models.PowerballDraw) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	c.draws = draws
	c.lastUpdated = time.Now()
}

// Get은 캐시된 데이터를 반환합니다.
//
// 반환값은 캐시된 데이터와 캐시가 유효한지 여부입니다.
func (c *Cache) Get() ([]models.PowerballDraw, bool) {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	// 캐시가 비어있거나 TTL이 만료된 경우
	if len(c.draws) == 0 || time.Since(c.lastUpdated) > c.ttl {
		return nil, false
	}

	return c.draws, true
}

// IsExpired는 캐시가 만료되었는지 확인합니다.
func (c *Cache) IsExpired() bool {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	return time.Since(c.lastUpdated) > c.ttl
}

// Clear는 캐시를 초기화합니다.
func (c *Cache) Clear() {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	c.draws = nil
	c.lastUpdated = time.Time{}
}
