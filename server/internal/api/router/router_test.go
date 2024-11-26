package router_test

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"server/internal/api/handler"
	"server/internal/api/router"
	"server/internal/models"
	"testing"

	"github.com/stretchr/testify/assert"
)

// Mock LottoServiceInterface for testing
type MockLottoService struct{}

func (m *MockLottoService) GenerateUniqueNumbers() ([]int, error) {
	return []int{1, 2, 3, 4, 5, 6}, nil
}

func (m *MockLottoService) GeneratePopularBasedNumbers() []int {
	return []int{7, 8, 9, 10, 11, 12}
}

func (m *MockLottoService) GetRoundNumbers(round int) (*models.LottoData, error) {
	return &models.LottoData{
		DrwNo:        round,
		DrwtNo1:      1,
		DrwtNo2:      2,
		DrwtNo3:      3,
		DrwtNo4:      4,
		DrwtNo5:      5,
		DrwtNo6:      6,
		BnusNo:       7,
		ReturnValue:  "success",
		DrwNoDate:    "2024-01-01",
		TotSellamnt:  1000000,
		FirstWinamnt: 500000,
	}, nil
}

func TestRouter(t *testing.T) {
	mockService := &MockLottoService{}
	lottoHandler := handler.NewLottoHandler(mockService)
	apiKey := "test-api-key"

	r := router.NewRouter(lottoHandler, apiKey)

	t.Run("Valid POST /api/v1/lotto/numbers", func(t *testing.T) {
		reqBody := `{"type": "unique"}` // 올바른 JSON 본문 추가
		req := httptest.NewRequest(http.MethodPost, "/api/v1/lotto/numbers", bytes.NewBufferString(reqBody))
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("X-API-Key", apiKey) // API 키 추가
		rec := httptest.NewRecorder()

		r.ServeHTTP(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code) // 기대 상태 코드: 200
	})

	t.Run("Valid GET /api/v1/lotto/rounds", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/api/v1/lotto/rounds?round=10", nil)
		req.Header.Set("X-API-Key", apiKey) // API 키 추가
		rec := httptest.NewRecorder()

		r.ServeHTTP(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
	})

	t.Run("Invalid Route", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/invalid", nil)
		req.Header.Set("X-API-Key", apiKey) // API 키 추가
		rec := httptest.NewRecorder()

		r.ServeHTTP(rec, req)

		assert.Equal(t, http.StatusNotFound, rec.Code)
	})
}
