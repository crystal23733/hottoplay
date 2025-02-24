package main

import (
	"log"
	"os"
	"powerball-lambda/config"
	"powerball-lambda/internal/cache"
	"powerball-lambda/internal/handlers"
	"powerball-lambda/internal/s3client"
	"powerball-lambda/internal/server"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
)

func main() {
	// 설정 로드
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Printf("Warning: 설정 로드 실패: %v", err)
	}

	// 캐시 초기화
	powerballCache := cache.NewCache(1 * time.Hour)

	// S3에서 초기 데이터 로드
	if cfg != nil {
		draws, err := s3client.LoadDataFromS3(cfg.S3BucketName, cfg.S3ObjectKey)
		if err != nil {
			log.Printf("Warning: S3 데이터 로드 실패: %v", err)
		} else {
			powerballCache.Set(draws)
		}
	}

	// 핸들러 초기화
	handler := handlers.NewHandler(powerballCache, nil)

	// Lambda 또는 로컬 서버 실행
	if os.Getenv("AWS_LAMBDA_RUNTIME_API") != "" {
		lambda.Start(handler.HandleRequest)
	} else {
		srv := server.NewServer(handler)
		log.Println("서버가 8080 포트에서 시작됩니다...")
		if err := srv.Start(":8080"); err != nil {
			log.Fatalf("서버 시작 실패: %v", err)
		}
	}
}
