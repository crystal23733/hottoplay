package service_test

import (
	"math/rand"
	"server/internal/memory"
	"server/internal/models"
	"server/internal/service"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestLottoService_GenerateUniqueNumbers(t *testing.T) {
	rand.Seed(time.Now().UnixNano())

	// Mock 데이터 준비
	mockData := []models.LottoData{
		{DrwtNo1: 1, DrwtNo2: 2, DrwtNo3: 3, DrwtNo4: 4, DrwtNo5: 5, DrwtNo6: 6},
		{DrwtNo1: 7, DrwtNo2: 8, DrwtNo3: 9, DrwtNo4: 10, DrwtNo5: 11, DrwtNo6: 12},
	}

	cache := memory.NewMemoryCache()
	service := service.NewLottoService(cache)

	// 데이터를 초기화
	service.InitializeData(mockData)

	// GenerateUniqueNumbers 테스트
	uniqueNumbers, err := service.GenerateUniqueNumbers()
	assert.NoError(t, err, "고유 번호 생성 중 오류 발생")
	assert.Len(t, uniqueNumbers, 6, "고유 번호 생성 결과가 6개가 아님")

	// 기존 번호와 중복되지 않는지 확인
	for _, d := range mockData {
		existing := []int{d.DrwtNo1, d.DrwtNo2, d.DrwtNo3, d.DrwtNo4, d.DrwtNo5, d.DrwtNo6}
		assert.NotEqual(t, existing, uniqueNumbers, "고유 번호가 기존 번호와 중복됨")
	}
}

func TestLottoService_GeneratePopularBasedNumbers(t *testing.T) {
	// Mock 데이터 준비
	mockData := []models.LottoData{
		{DrwtNo1: 1, DrwtNo2: 2, DrwtNo3: 3, DrwtNo4: 4, DrwtNo5: 5, DrwtNo6: 6},
		{DrwtNo1: 1, DrwtNo2: 2, DrwtNo3: 3, DrwtNo4: 7, DrwtNo5: 8, DrwtNo6: 9},
	}

	cache := memory.NewMemoryCache()
	service := service.NewLottoService(cache)

	// 데이터를 초기화
	service.InitializeData(mockData)

	// GeneratePopularBasedNumbers 테스트
	popularNumbers := service.GeneratePopularBasedNumbers()
	assert.Len(t, popularNumbers, 6, "인기 번호 생성 결과가 6개가 아님")

	// 가장 자주 나온 번호가 포함되었는지 확인
	assert.Contains(t, popularNumbers, 1, "가장 자주 나온 번호가 포함되지 않음")
	assert.Contains(t, popularNumbers, 2, "가장 자주 나온 번호가 포함되지 않음")
}

func TestLottoService_GenerateUserBasedNumbers(t *testing.T) {
	rand.Seed(time.Now().UnixNano())

	cache := memory.NewMemoryCache()
	service := service.NewLottoService(cache)

	// 사용자가 선택한 번호 기반 조합 생성 테스트
	userNumbers := []int{1, 2, 3}
	generatedNumbers, err := service.GenerateUserBasedNumbers(userNumbers)
	assert.NoError(t, err, "사용자 기반 번호 생성 중 오류 발생")
	assert.Len(t, generatedNumbers, 6, "사용자 기반 번호 생성 결과가 6개가 아님")

	// 사용자 번호가 포함되었는지 확인
	for _, num := range userNumbers {
		assert.Contains(t, generatedNumbers, num, "사용자 번호가 포함되지 않음")
	}

	// 잘못된 사용자 번호 테스트
	invalidUserNumbers := []int{1, 2, 3, 4, 5, 6, 7}
	_, err = service.GenerateUserBasedNumbers(invalidUserNumbers)
	assert.Error(t, err, "유효하지 않은 사용자 번호를 처리 중 오류가 발생하지 않음")
}
