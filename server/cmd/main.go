package main

import (
	"context"
	"log"
	"net/http"
	"server/config"
	apiHandler "server/internal/api/handler"
	"server/internal/api/router"
	"server/internal/memory"
	"server/internal/s3"
	"server/internal/service"

	"github.com/gorilla/handlers"
)

func main() {
	// 환경 변수 로드
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("환경 변수 로드 실패: %v", err)
	}

	// S3 클라이언트 초기화
	s3Client, err := s3.NewS3Client(cfg.S3Bucket, cfg.S3Region, cfg.S3Prefix)
	if err != nil {
		log.Fatalf("S3 클라이언트 초기화 실패: %v", err)
	}

	// 메모리 캐시 초기화
	cache := memory.NewMemoryCache()

	// Lotto 서비스 초기화
	lottoService := service.NewLottoService(cache, s3Client)

	// 데이터 초기화
	ctx := context.Background()
	if err := lottoService.InitializeData(ctx); err != nil {
		log.Fatalf("데이터 초기화 실패: %v", err)
	}

	// 핸들러 초기화
	lottoHandler := apiHandler.NewLottoHandler(lottoService)

	// 라우터 설정
	r := router.NewRouter(lottoHandler, cfg.APIKey)

	// CORS 설정
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{cfg.ClientURL, cfg.ClientURLWWW}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "PATCH"}),
		handlers.AllowedHeaders([]string{"X-API-KEY", "Content-Type", "Authorization"}),
		handlers.AllowCredentials(),
	)

	// 서버 시작
	log.Printf("Lotto 서비스가 시작되었습니다. 포트: %s\n", cfg.AppPort)
	if err := http.ListenAndServe(":"+cfg.AppPort, corsHandler(r)); err != nil {
		log.Fatalf("서버 실행 실패: %v", err)
	}
}
