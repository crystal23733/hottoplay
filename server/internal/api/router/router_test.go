package router

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"server/internal/api/handler"
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

func TestRouter(t *testing.T) {
	// 테스트용 서비스 설정
	mockService := &mockLottoService{
		randomNumbers: []int{1, 2, 3, 4, 5, 6},
	}

	// 핸들러와 라우터 설정
	lottoHandler := handler.NewLottoHandler(mockService)
	router := NewRouter(lottoHandler, "test-api-key")

	tests := []struct {
		name           string
		method         string
		path           string
		body           interface{}
		apiKey         string
		expectedStatus int
	}{
		{
			name:   "Valid request with correct API key",
			method: http.MethodPost,
			path:   "/api/v1/lotto/numbers",
			body: models.LottoRequest{
				Type: "default",
			},
			apiKey:         "test-api-key",
			expectedStatus: http.StatusOK,
		},
		{
			name:   "Invalid API key",
			method: http.MethodPost,
			path:   "/api/v1/lotto/numbers",
			body: models.LottoRequest{
				Type: "default",
			},
			apiKey:         "wrong-api-key",
			expectedStatus: http.StatusUnauthorized,
		},
		{
			name:   "Missing API key",
			method: http.MethodPost,
			path:   "/api/v1/lotto/numbers",
			body: models.LottoRequest{
				Type: "default",
			},
			apiKey:         "",
			expectedStatus: http.StatusUnauthorized,
		},
		{
			name:           "Invalid method",
			method:         http.MethodGet,
			path:           "/api/v1/lotto/numbers",
			apiKey:         "test-api-key",
			expectedStatus: http.StatusMethodNotAllowed,
		},
		{
			name:           "Invalid path",
			method:         http.MethodPost,
			path:           "/api/v1/invalid",
			apiKey:         "test-api-key",
			expectedStatus: http.StatusNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var bodyReader *bytes.Reader
			if tt.body != nil {
				bodyBytes, _ := json.Marshal(tt.body)
				bodyReader = bytes.NewReader(bodyBytes)
			} else {
				bodyReader = bytes.NewReader([]byte{})
			}

			req := httptest.NewRequest(tt.method, tt.path, bodyReader)
			if tt.apiKey != "" {
				req.Header.Set("X-API-Key", tt.apiKey)
			}
			req.Header.Set("Content-Type", "application/json")

			rr := httptest.NewRecorder()
			router.ServeHTTP(rr, req)

			if rr.Code != tt.expectedStatus {
				t.Errorf("handler returned wrong status code: got %v want %v",
					rr.Code, tt.expectedStatus)
			}

			if tt.expectedStatus == http.StatusOK {
				var response models.LottoResponse
				err := json.NewDecoder(rr.Body).Decode(&response)
				if err != nil {
					t.Fatalf("Failed to decode response: %v", err)
				}

				if len(response.Numbers) != 6 {
					t.Errorf("handler returned wrong number of numbers: got %d want 6",
						len(response.Numbers))
				}
			}
		})
	}
}

// TestRouterConcurrency는 라우터의 동시성 처리를 테스트합니다.
func TestRouterConcurrency(t *testing.T) {
	mockService := &mockLottoService{
		randomNumbers: []int{1, 2, 3, 4, 5, 6},
	}
	lottoHandler := handler.NewLottoHandler(mockService)
	router := NewRouter(lottoHandler, "test-api-key")

	// 동시에 여러 요청을 보내는 테스트
	concurrentRequests := 10
	done := make(chan bool)

	for i := 0; i < concurrentRequests; i++ {
		go func() {
			body, _ := json.Marshal(models.LottoRequest{Type: "default"})
			req := httptest.NewRequest(http.MethodPost, "/api/v1/lotto/numbers", bytes.NewReader(body))
			req.Header.Set("X-API-Key", "test-api-key")
			req.Header.Set("Content-Type", "application/json")

			rr := httptest.NewRecorder()
			router.ServeHTTP(rr, req)

			if rr.Code != http.StatusOK {
				t.Errorf("concurrent request failed with status: %d", rr.Code)
			}
			done <- true
		}()
	}

	// 모든 고루틴이 완료될 때까지 대기
	for i := 0; i < concurrentRequests; i++ {
		<-done
	}
}
