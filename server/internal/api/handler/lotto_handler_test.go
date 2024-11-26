package handler_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"server/internal/api/handler"
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

func (m *MockLottoService) GetRoundNumbers(round int) (*models.LottoRoundData, error) {
	return &models.LottoRoundData{
		DrwNo:        round,
		Numbers:      []int{1, 2, 3, 4, 5, 6},
		BnusNo:       7,
		ReturnValue:  "success",
		DrwNoDate:    "2024-01-01",
		TotSellamnt:  1000000,
		FirstWinamnt: 500000,
	}, nil
}

func TestGenerateNumbers(t *testing.T) {
	mockService := &MockLottoService{}
	handler := handler.NewLottoHandler(mockService)

	t.Run("Unique Numbers", func(t *testing.T) {
		reqBody := `{"type": "unique"}`
		req := httptest.NewRequest(http.MethodPost, "/lotto/numbers", bytes.NewBufferString(reqBody))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		handler.GenerateNumbers(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		var resp models.LottoResponse
		err := json.NewDecoder(rec.Body).Decode(&resp)
		assert.NoError(t, err)
		assert.Equal(t, []int{1, 2, 3, 4, 5, 6}, resp.Numbers)
	})

	t.Run("Unsupported Type", func(t *testing.T) {
		reqBody := `{"type": "unsupported"}`
		req := httptest.NewRequest(http.MethodPost, "/lotto/numbers", bytes.NewBufferString(reqBody))
		rec := httptest.NewRecorder()

		handler.GenerateNumbers(rec, req)

		assert.Equal(t, http.StatusBadRequest, rec.Code)
		assert.Contains(t, rec.Body.String(), "지원하지 않는 생성 타입입니다")
	})
}

func TestGetRoundNumbers(t *testing.T) {
	mockService := &MockLottoService{}
	handler := handler.NewLottoHandler(mockService)

	t.Run("Valid Round", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/lotto/rounds?round=10", nil)
		rec := httptest.NewRecorder()

		handler.GetRoundNumbers(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		var resp models.LottoRoundData
		err := json.NewDecoder(rec.Body).Decode(&resp)
		assert.NoError(t, err)
		assert.Equal(t, 10, resp.DrwNo)
	})

	t.Run("Invalid Round", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/lotto/rounds?round=invalid", nil)
		rec := httptest.NewRecorder()

		handler.GetRoundNumbers(rec, req)

		assert.Equal(t, http.StatusBadRequest, rec.Code)
		assert.Contains(t, rec.Body.String(), "유효하지 않은 회차 번호입니다")
	})
}
