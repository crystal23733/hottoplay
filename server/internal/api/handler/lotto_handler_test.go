package handler_test

import (
	"bytes"
	"encoding/json"
	"fmt"
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
		DrwNo:          round,
		Numbers:        []int{1, 2, 3, 4, 5, 6},
		ReturnValue:    "success",
		DrwNoDate:      "2024-01-01",
		TotSellamnt:    1000000,
		FirstWinamnt:   500000,
		FirstPrzwnerCo: 1,
		FirstAccumamnt: 500000,
	}, nil
}

func (m *MockLottoService) GetPopularWatch(popular string) ([]*models.PopularResponse, error) {
	return []*models.PopularResponse{
		{Numbers: 1, Freq: 50},
		{Numbers: 2, Freq: 40},
	}, nil
}

func (m *MockLottoService) GenerateStatisticsBasedNumbers(statisticsType string) ([]int, error) {
	switch statisticsType {
	case "hot":
		return []int{1, 2, 3, 4, 5, 6}, nil
	case "cold":
		return []int{7, 8, 9, 10, 11, 12}, nil
	case "balanced":
		return []int{13, 14, 15, 16, 17, 18}, nil
	case "weighted":
		return []int{19, 20, 21, 22, 23, 24}, nil
	default:
		return nil, fmt.Errorf("지원하지 않는 통계 타입입니다: %s", statisticsType)
	}
}

func TestLottoHandler(t *testing.T) {
	mockService := &MockLottoService{}
	lottoHandler := handler.NewLottoHandler(mockService)

	t.Run("GenerateNumbers - Unique Numbers", func(t *testing.T) {
		reqBody := `{"type": "unique"}`
		req := httptest.NewRequest(http.MethodPost, "/lotto/numbers", bytes.NewBufferString(reqBody))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		lottoHandler.GenerateNumbers(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		var resp models.LottoResponse
		err := json.NewDecoder(rec.Body).Decode(&resp)
		assert.NoError(t, err)
		assert.Equal(t, []int{1, 2, 3, 4, 5, 6}, resp.Numbers)
	})

	t.Run("GenerateNumbers - Unsupported Type", func(t *testing.T) {
		reqBody := `{"type": "unsupported"}`
		req := httptest.NewRequest(http.MethodPost, "/lotto/numbers", bytes.NewBufferString(reqBody))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		lottoHandler.GenerateNumbers(rec, req)

		assert.Equal(t, http.StatusBadRequest, rec.Code)
		assert.Contains(t, rec.Body.String(), "지원하지 않는 생성 타입입니다")
	})

	t.Run("GetRoundNumbers - Valid Round", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/lotto/rounds?round=10", nil)
		rec := httptest.NewRecorder()

		lottoHandler.GetRoundNumbers(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		var resp models.LottoData
		err := json.NewDecoder(rec.Body).Decode(&resp)
		assert.NoError(t, err)
		assert.Equal(t, 10, resp.DrwNo)
		assert.Equal(t, "success", resp.ReturnValue)
	})

	t.Run("GetRoundNumbers - Invalid Round", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/lotto/rounds?round=invalid", nil)
		rec := httptest.NewRecorder()

		lottoHandler.GetRoundNumbers(rec, req)

		assert.Equal(t, http.StatusBadRequest, rec.Code)
		assert.Contains(t, rec.Body.String(), "유효하지 않은 회차 번호입니다")
	})

	t.Run("GetPopularWatch - Valid Request", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/lotto/popular?popular=watch", nil)
		rec := httptest.NewRecorder()

		lottoHandler.GetPopularWatch(rec, req)

		assert.Equal(t, http.StatusOK, rec.Code)
		var resp []*models.PopularResponse
		err := json.NewDecoder(rec.Body).Decode(&resp)
		assert.NoError(t, err)
		assert.Equal(t, 2, len(resp))
		assert.Equal(t, 1, resp[0].Numbers)
		assert.Equal(t, 50, resp[0].Freq)
	})

	t.Run("GenerateNumbers - Statistics Based", func(t *testing.T) {
		testCases := []struct {
			name         string
			requestBody  string
			expectedCode int
			expectedNums []int
		}{
			{
				name:         "Hot Numbers",
				requestBody:  `{"type": "statistics", "statisticsType": "hot"}`,
				expectedCode: http.StatusOK,
				expectedNums: []int{1, 2, 3, 4, 5, 6},
			},
			{
				name:         "Cold Numbers",
				requestBody:  `{"type": "statistics", "statisticsType": "cold"}`,
				expectedCode: http.StatusOK,
				expectedNums: []int{7, 8, 9, 10, 11, 12},
			},
			{
				name:         "Invalid Statistics Type",
				requestBody:  `{"type": "statistics", "statisticsType": "invalid"}`,
				expectedCode: http.StatusBadRequest,
				expectedNums: nil,
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				req := httptest.NewRequest(http.MethodPost, "/lotto/numbers",
					bytes.NewBufferString(tc.requestBody))
				req.Header.Set("Content-Type", "application/json")
				rec := httptest.NewRecorder()

				lottoHandler.GenerateNumbers(rec, req)

				assert.Equal(t, tc.expectedCode, rec.Code)
				if tc.expectedNums != nil {
					var resp models.LottoResponse
					err := json.NewDecoder(rec.Body).Decode(&resp)
					assert.NoError(t, err)
					assert.Equal(t, tc.expectedNums, resp.Numbers)
				}
			})
		}
	})
}
