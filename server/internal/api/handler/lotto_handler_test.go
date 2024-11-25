package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"server/internal/models"
	"testing"
)

// mockLottoService는 테스트를 위한 LottoService 모의 구현체입니다.
type mockLottoService struct {
	randomNumbers       []int
	uniqueNumbers       []int
	popularBasedNumbers []int
	userBasedNumbers    []int
	err                 error
}

func (m *mockLottoService) GenerateRandomNumbers() []int {
	return m.randomNumbers
}

func (m *mockLottoService) GenerateUniqueNumbers() ([]int, error) {
	return m.uniqueNumbers, m.err
}

func (m *mockLottoService) GeneratePopularBasedNumbers() []int {
	return m.popularBasedNumbers
}

func (m *mockLottoService) GenerateUserBasedNumbers(numbers []int) ([]int, error) {
	return m.userBasedNumbers, m.err
}

// compareSlices는 두 정수 슬라이스가 동일한지 비교합니다.
func compareSlices(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func TestLottoHandler_GenerateNumbers(t *testing.T) {
	tests := []struct {
		name            string
		requestBody     models.LottoRequest
		mockService     *mockLottoService
		expectedStatus  int
		expectedNumbers []int
	}{
		{
			name: "Default generation",
			requestBody: models.LottoRequest{
				Type: "default",
			},
			mockService: &mockLottoService{
				randomNumbers: []int{1, 2, 3, 4, 5, 6},
			},
			expectedStatus:  http.StatusOK,
			expectedNumbers: []int{1, 2, 3, 4, 5, 6},
		},
		{
			name: "Unique generation",
			requestBody: models.LottoRequest{
				Type: "unique",
			},
			mockService: &mockLottoService{
				uniqueNumbers: []int{7, 8, 9, 10, 11, 12},
			},
			expectedStatus:  http.StatusOK,
			expectedNumbers: []int{7, 8, 9, 10, 11, 12},
		},
		{
			name: "Popular based generation",
			requestBody: models.LottoRequest{
				Type: "many",
			},
			mockService: &mockLottoService{
				popularBasedNumbers: []int{13, 14, 15, 16, 17, 18},
			},
			expectedStatus:  http.StatusOK,
			expectedNumbers: []int{13, 14, 15, 16, 17, 18},
		},
		{
			name: "User based generation",
			requestBody: models.LottoRequest{
				Type: "custom",
			},
			mockService: &mockLottoService{
				userBasedNumbers: []int{1, 2, 3, 19, 20, 21},
			},
			expectedStatus:  http.StatusOK,
			expectedNumbers: []int{1, 2, 3, 19, 20, 21},
		},
		{
			name: "Invalid type",
			requestBody: models.LottoRequest{
				Type: "invalid",
			},
			mockService:    &mockLottoService{},
			expectedStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			handler := NewLottoHandler(tt.mockService)

			body, _ := json.Marshal(tt.requestBody)
			req := httptest.NewRequest(http.MethodPost, "/api/v1/lotto/numbers", bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")

			rr := httptest.NewRecorder()
			handler.GenerateNumbers(rr, req)

			if rr.Code != tt.expectedStatus {
				t.Errorf("handler returned wrong status code: got %v want %v", rr.Code, tt.expectedStatus)
			}

			if tt.expectedStatus == http.StatusOK {
				var response models.LottoResponse
				err := json.NewDecoder(rr.Body).Decode(&response)
				if err != nil {
					t.Fatalf("Failed to decode response: %v", err)
				}

				if !compareSlices(response.Numbers, tt.expectedNumbers) {
					t.Errorf("handler returned unexpected numbers: got %v want %v", response.Numbers, tt.expectedNumbers)
				}
			}
		})
	}
}
