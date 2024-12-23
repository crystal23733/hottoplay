package main

import (
	"board-server/config"
	"board-server/internal/delivery/http/handler"
	noticeRepo "board-server/internal/repository/mongodb"
	"board-server/internal/router"
	"board-server/internal/usecase"
	"board-server/pkg/database"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// 환경 변수 로드
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("환경 변수 로드 실패: %v", err)
	}

	// MongoDB 연결
	db, mongodb, err := database.Connect(database.Config{
		URI:      cfg.DB_URL,
		Database: cfg.DB_NAME,
	})
	if err != nil {
		log.Fatalf("MongoDB 연결 실패: %v", err)
	}

	// 프로그램 종료 시 MongoDB 연결 종료
	defer func() {
		if err := mongodb.Disconnect(); err != nil {
			log.Printf("MongoDB 연결 종료 실패: %v", err)
		}
	}()

	e := echo.New()

	// CORS 설정
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{cfg.Client_URL},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization, "X-Requested-With"},
		AllowCredentials: true,
	}))

	// 기타 미들웨어 설정
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.RequestID())

	// 레포지토리 초기화
	noticeRepo := noticeRepo.NewNoticeRepository(db)

	// 유스케이스 초기화
	noticeUsecase := usecase.NewNoticeUsecase(&noticeRepo)

	// 핸들러 초기화
	noticeHandler := handler.NewNoticeHandler(noticeUsecase)

	// 라우터 초기화
	router.InitRoutes(e, noticeHandler)

	e.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":" + cfg.Port))

}
