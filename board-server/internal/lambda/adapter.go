package lambda

import (
	"board-server/config"
	"board-server/internal/delivery/http/handler"
	noticeRepo "board-server/internal/repository/mongodb"
	"board-server/internal/usecase"
	"board-server/pkg/database"
	"context"
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type LambdaAdapter struct {
	echo *echo.Echo
}

type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

func NewLambdaAdapter() *LambdaAdapter {
	// 환경 변수 로드
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("환경 변수 로드 실패: %v", err)
	}

	// MongoDB 연결
	db, _, err := database.Connect(database.Config{
		URI:      cfg.DB_URL,
		Database: cfg.DB_NAME,
	})
	if err != nil {
		log.Fatalf("MongoDB 연결 실패: %v", err)
	}

	e := echo.New()

	// CORS 설정
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{cfg.Client_URL, cfg.ClientURLWWW, "*"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization, "X-Requested-With"},
		AllowCredentials: true,
	}))

	// 기타 미들웨어 설정
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.RequestID())

	// 레포지토리 초기화
	noticeRepository := noticeRepo.NewNoticeRepository(db)

	// 유스케이스 초기화
	noticeUsecase := usecase.NewNoticeUsecase(&noticeRepository)

	// 핸들러 초기화
	noticeHandler := handler.NewNoticeHandler(noticeUsecase)

	// API 그룹 생성
	api := e.Group("/api/v1")

	// 공지사항 라우트
	notices := api.Group("/notices")

	// 헬스체크
	notices.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Board API OK")
	})

	// 공지사항 라우트 설정
	notices.GET("/list", noticeHandler.GetNotices)
	notices.GET("/:timestamp", noticeHandler.GetNoticeDetail)

	return &LambdaAdapter{
		echo: e,
	}
}

func (a *LambdaAdapter) HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	headers := map[string]string{
		"Access-Control-Allow-Origin":      "*",
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Methods":     "OPTIONS,POST,GET,PUT,DELETE",
		"Access-Control-Allow-Headers":     "Content-Type,Authorization,X-Requested-With",
		"Access-Control-Allow-Credentials": "true",
	}

	// OPTIONS 요청 처리
	if request.HTTPMethod == "OPTIONS" {
		return Response{StatusCode: 200, Headers: headers, Body: ""}, nil
	}

	// 공지사항 관련 경로만 처리
	if !strings.Contains(request.Path, "/notices") {
		return Response{StatusCode: 404, Headers: headers, Body: `{"error": "잘못된 경로입니다"}`}, nil
	}

	// Echo를 사용하여 요청 처리
	rec := &MockRecorder{
		Code:      200,
		HeaderMap: make(http.Header),
		Body:      "",
	}

	// HTTP 요청 생성
	body := request.Body
	if request.IsBase64Encoded {
		// Base64 디코딩이 필요한 경우 (현재는 JSON만 처리)
		body = request.Body
	}

	req, err := http.NewRequest(request.HTTPMethod, request.Path, strings.NewReader(body))
	if err != nil {
		return Response{StatusCode: 500, Headers: headers, Body: `{"error": "요청 생성 실패"}`}, nil
	}

	// 헤더 복사
	for key, value := range request.Headers {
		req.Header.Set(key, value)
	}

	// 쿼리 파라미터 설정
	if len(request.QueryStringParameters) > 0 {
		q := req.URL.Query()
		for key, value := range request.QueryStringParameters {
			q.Add(key, value)
		}
		req.URL.RawQuery = q.Encode()
	}

	// Echo로 요청 처리
	a.echo.ServeHTTP(rec, req)

	// 응답 반환
	responseHeaders := make(map[string]string)
	for key, values := range rec.HeaderMap {
		if len(values) > 0 {
			responseHeaders[key] = values[0]
		}
	}

	// CORS 헤더 추가/덮어쓰기
	for key, value := range headers {
		responseHeaders[key] = value
	}

	return Response{
		StatusCode: rec.Code,
		Headers:    responseHeaders,
		Body:       rec.Body,
	}, nil
}

// MockRecorder는 http.ResponseWriter를 모킹합니다.
type MockRecorder struct {
	Code      int
	HeaderMap http.Header
	Body      string
}

func (r *MockRecorder) Header() http.Header {
	return r.HeaderMap
}

func (r *MockRecorder) Write(data []byte) (int, error) {
	r.Body += string(data)
	return len(data), nil
}

func (r *MockRecorder) WriteHeader(statusCode int) {
	r.Code = statusCode
}

func (r *MockRecorder) WriteString(s string) (int, error) {
	r.Body += s
	return len(s), nil
}
