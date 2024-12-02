package router

import (
	"net/http"
	"server/internal/api/handler"
	"server/internal/api/middleware"

	"github.com/gorilla/mux"
)

// NewRouter는 새로운 HTTP 라우터를 생성합니다.
func NewRouter(lottoHandler *handler.LottoHandler, apiKey string) *mux.Router {
	r := mux.NewRouter()

	// 기본 라우트 추가 (헬스 체크용)
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"message": "Hello, World!"}`))
	}).Methods(http.MethodGet)

	// API 서브라우터 설정
	api := r.PathPrefix("/api/v1").Subrouter()

	// 미들웨어 적용
	api.Use(middleware.APIKeyMiddleware(apiKey))

	// 엔드포인트 설정
	api.HandleFunc("/lotto/numbers", lottoHandler.GenerateNumbers).Methods(http.MethodPost)
	api.HandleFunc("/lotto/rounds", lottoHandler.GetRoundNumbers).Methods(http.MethodGet)
	api.HandleFunc("/lotto/populars", lottoHandler.GetPopularWatch).Methods(http.MethodGet)

	return r
}
