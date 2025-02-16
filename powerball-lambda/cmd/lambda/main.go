package main

import (
	"context"
	"errors"
	"os"
	"powerball-lambda/internal/cache"
	"powerball-lambda/internal/generator"
	"powerball-lambda/internal/models"
	"powerball-lambda/internal/s3client"
	"time"
)

// GenerateRequest는 번호 생성 요청의 구조를 정의합니다.
type GenerateRequest struct {
	// Methid는 번호 생성 방식을 지정합니다.
	// "random", "hot", "cold", "unique" 중 하나
	Method string `json:"method"`

	// Count는 생성할 번호 세트의 개수입니다.
	Count int `json:"count"`
}

// GenerateResponse는 번호 생성 응답의 구조를 정의합니다.
type GenerateResponse struct {
	// Numbers는 생성된 번호 세트들입니다.
	Numbers []models.GeneratedNumbers `json:"numbers"`

	// Error는 에러 발생 시 에러 메시지를 포함합니다.
	Error string `json:"error,omitempty"`
}

var (
	// 전역 캐시 인스턴스
	powerballCache *cache.Cache

	// 전역 생성기 인스턴스
	numberGenerator *generator.Generator
)

// 환경 변수로 S3 설정을 관리
var (
	s3BucketName = os.Getenv("S3_BUCKET_NAME")
	s3ObjectKey  = os.Getenv("S3_OBJECT_KEY")
)

func init() {
	// 24시간 TTL로 캐시 초기화
	powerballCache = cache.NewCache(24 * time.Hour)
}

// HandleRequest는 Lambda요청을 처리합니다.
func HandleRequest(ctx context.Context, request GenerateRequest) (GenerateResponse, error) {
	// 요청 유효성 검사
	if err := validateRequest(request); err != nil {
		return GenerateResponse{Error: err.Error()}, nil
	}

	// 캐시된 데이터 확인 및 필요시 새로 로드
	if err := ensureDataLoaded(); err != nil {
		return GenerateResponse{Error: "데이터 로드 실패: " + err.Error()}, nil
	}

	// 번호 생성
	numbers, err := generateNumbers(request)
	if err != nil {
		return GenerateResponse{Error: err.Error()}, nil
	}

	return GenerateResponse{Numbers: numbers}, nil
}

// validateRequest는 요청의 유효성을 검사합니다.
func validateRequest(request GenerateRequest) error {
	if request.Count < 1 || request.Count > 10 {
		return errors.New("생성 개수는 1-10 사이여야 합니다")
	}

	validMethods := map[string]bool{
		"random": true,
		"hot":    true,
		"cold":   true,
		"unique": true,
	}

	if !validMethods[request.Method] {
		return errors.New("유효하지 않은 생성 방식입니다")
	}

	return nil
}

// ensureDataLoaded는 캐시된 데이터가 있는지 확인하고 없으면 새로 로드합니다.
func ensureDataLoaded() error {
	draws, valid := powerballCache.Get()
	if !valid {
		// S3에서 데이터 로드
		newDraws, err := loadDataFromS3()
		if err != nil {
			return err
		}

		// 캐시 업데이트
		powerballCache.Set(newDraws)
		draws = newDraws
	}

	// 생성기 초기화 또는 업데이트
	numberGenerator = generator.NewGenerator(draws)
	return nil
}

// generateNumbers는 요청된 방식으로 번호를 생성합니다.
func generateNumbers(request GenerateRequest) ([]models.GeneratedNumbers, error) {
	numbers := make([]models.GeneratedNumbers, 0, request.Count)

	for i := 0; i < request.Count; i++ {
		var number models.GeneratedNumbers
		var err error

		switch request.Method {
		case "ramdom":
			number = numberGenerator.GenerateRandom()
		case "hot":
			number = numberGenerator.GenerateHotNumbers()
		case "cold":
			number = numberGenerator.GenerateColdNumbers()
		case "unique":
			number, err = numberGenerator.GenerateUniqueCombination(1000)
			if err != nil {
				return nil, err
			}
		}

		numbers = append(numbers, number)
	}

	return numbers, nil
}

// loadDataFromS3는 s3client 패키지의 함수를 호출합니다.
func loadDataFromS3() ([]models.PowerballDraw, error) {
	if s3BucketName == "" || s3ObjectKey == "" {
		return nil, errors.New("S3 설정이 없습니다")
	}

	return s3client.LoadDataFromS3(s3BucketName, s3ObjectKey)
}
