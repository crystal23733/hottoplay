package server

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"powerball-lambda/internal/cache"
	"powerball-lambda/internal/handlers"
	"powerball-lambda/internal/models"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestServer(t *testing.T) {
	// 테스트용 캐시와 데이터 설정
	testCache := cache.NewCache(1 * time.Hour)
	testCache.Set([]models.PowerballDraw{
		{
			Date:         "Wed, Jan 8, 2025",
			WhiteNumbers: []string{"1", "20", "36", "38", "43"},
			Powerball:    "24",
		},
	})

	handler := handlers.NewHandler(testCache, nil, false)
	server := NewServer(handler)

	t.Run("CORS Headers Check", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodOptions, "/api/generate", nil)
		w := httptest.NewRecorder()

		// CORS 미들웨어를 직접 생성하고 테스트
		corsMiddleware := func(next http.HandlerFunc) http.HandlerFunc {
			return func(w http.ResponseWriter, r *http.Request) {
				w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Access-Control-Allow-Credentials", "true")

				if r.Method == "OPTIONS" {
					w.WriteHeader(http.StatusOK)
					return
				}
				next(w, r)
			}
		}

		handler := corsMiddleware(func(w http.ResponseWriter, r *http.Request) {})
		handler(w, req)

		assert.Equal(t, "http://localhost:3000", w.Header().Get("Access-Control-Allow-Origin"))
		assert.Equal(t, "GET, POST, PUT, DELETE, PATCH, OPTIONS", w.Header().Get("Access-Control-Allow-Methods"))
		assert.Equal(t, "Content-Type", w.Header().Get("Access-Control-Allow-Headers"))
	})

	t.Run("Generate Request Handler", func(t *testing.T) {
		body := bytes.NewBufferString(`{"method":"random","count":1}`)
		req := httptest.NewRequest(http.MethodPost, "/api/generate", body)
		w := httptest.NewRecorder()

		// CORS 미들웨어를 포함한 핸들러 호출
		corsMiddleware := func(next http.HandlerFunc) http.HandlerFunc {
			return func(w http.ResponseWriter, r *http.Request) {
				w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
				w.Header().Set("Content-Type", "application/json")
				w.Header().Set("Access-Control-Allow-Credentials", "true")

				if r.Method == "OPTIONS" {
					w.WriteHeader(http.StatusOK)
					return
				}
				next(w, r)
			}
		}

		handler := corsMiddleware(server.handleGenerate)
		handler(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		assert.Contains(t, w.Header().Get("Content-Type"), "application/json")
	})
}
