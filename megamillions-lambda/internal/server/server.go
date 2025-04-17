package server

import (
	"context"
	"io"
	"megamillions-lambda/internal/handlers"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

// Server는 HTTP 서버를 관리하는 구조체입니다.
type Server struct {
	handler *handlers.Handler
}

// NewServer는 새로운 Server 인스턴스를 생성합니다.
func NewServer(handler *handlers.Handler) *Server {
	return &Server{
		handler: handler,
	}
}

func (s *Server) Start(port string) error {
	// CORS 미들웨어 설정
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

	// 라우터 설정
	http.HandleFunc("/api/generate", corsMiddleware(s.handleGenerate))
	http.HandleFunc("/api/statistics", corsMiddleware(s.handleStatistics))
	http.HandleFunc("/api/draws", corsMiddleware(s.handleDrawList))
	http.HandleFunc("/api/draw", corsMiddleware(s.handleDrawDetail))
	http.HandleFunc("/api/number-frequency", corsMiddleware(s.handleNumberFrequency))

	// 서버 시작
	return http.ListenAndServe(port, nil)
}

// handleGenerate는 번호 생성 요청을 처리합니다.
func (s *Server) handleGenerate(w http.ResponseWriter, r *http.Request) {
	s.handleRequest(w, r, "/generate")
}

// handleStatistics는 통계 요청을 처리합니다.
func (s *Server) handleStatistics(w http.ResponseWriter, r *http.Request) {
	s.handleRequest(w, r, "/statistics")
}

// handleDrawList는 회차 목록 요청을 처리합니다.
func (s *Server) handleDrawList(w http.ResponseWriter, r *http.Request) {
	s.handleRequest(w, r, "/draws")
}

// handleDrawDetail는 특정 회차 요청을 처리합니다.
func (s *Server) handleDrawDetail(w http.ResponseWriter, r *http.Request) {
	s.handleRequest(w, r, "/draw")
}

// handleNumberFrequency는 번호 빈도 요청을 처리합니다.
func (s *Server) handleNumberFrequency(w http.ResponseWriter, r *http.Request) {
	s.handleRequest(w, r, "/number-frequency")
}

// handleRequest는 요청을 처리하는 공통 함수입니다.
func (s *Server) handleRequest(w http.ResponseWriter, r *http.Request, path string) {
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}

	// APIGateway 요청 형식으로 변환
	request := events.APIGatewayProxyRequest{
		Path:       path,
		Body:       string(bodyBytes),
		HTTPMethod: r.Method,
	}

	var response handlers.Response
	var handlerErr error

	// 경로에 따라 적절한 핸들러 호출
	switch path {
	case "/generate":
		response, handlerErr = s.handler.HandleRequest(context.Background(), request)
	case "/statistics":
		response, handlerErr = s.handler.HandleStatisticsRequest(context.Background(), request)
	case "/draws":
		response, handlerErr = s.handler.HandleDrawListRequest(context.Background(), request)
	case "/draw":
		response, handlerErr = s.handler.HandleDrawDetailRequest(context.Background(), request)
	case "/number-frequency":
		response, handlerErr = s.handler.HandleNumberFrequencyRequest(context.Background(), request)
	default:
		http.Error(w, "Invalid path", http.StatusNotFound)
		return
	}

	if handlerErr != nil {
		http.Error(w, handlerErr.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(response.StatusCode)
	w.Write([]byte(response.Body))
}
