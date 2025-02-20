package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"powerball-lambda/internal/cache"
	"powerball-lambda/internal/generator"
	"powerball-lambda/internal/models"
	"powerball-lambda/internal/s3client"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/joho/godotenv"
)

// Response는 API Gateway에 맞춘 응답 구조체입니다.
type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

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
	// 로컬 환경에서 .env 파일 로드
	if os.Getenv("AWS_LAMBDA_RUNTIME_API") == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}
}

// HandleRequest는 Lambda요청을 처리합니다.
func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	// CORS 헤더 설정
	headers := map[string]string{
		"Access-Control-Allow-Origin":      "https://hottoplay.com, https://www.hottoplay.com",
		"Access-Control-Allow-Methods":     "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		"Access-Control-Allow-Headers":     "Content-Type",
		"Access-Control-Allow-Credentials": "true",
		"Content-Type":                     "application/json",
	}

	// OPTIONS 요청 처리 (CORS preflight)
	if request.HTTPMethod == "OPTIONS" {
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       "",
		}, nil
	}

	// 요청 본문 파싱
	var generateRequest GenerateRequest
	if err := json.Unmarshal([]byte(request.Body), &generateRequest); err != nil {
		return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
	}

	// 요청 유효성 검사
	if err := validateRequest(generateRequest); err != nil {
		return createErrorResponse(headers, err.Error(), 400), nil
	}

	// 데이터 로드 확인
	if err := ensureDataLoaded(); err != nil {
		return createErrorResponse(headers, "데이터 로드 실패: "+err.Error(), 500), nil
	}

	// 번호 생성
	numbers, err := generateNumbers(generateRequest)
	if err != nil {
		return createErrorResponse(headers, "번호 생성 실패: "+err.Error(), 500), nil
	}

	// 응답 생성
	responseBody, err := json.Marshal(GenerateResponse{Numbers: numbers})
	if err != nil {
		return createErrorResponse(headers, "응답 생성 실패: "+err.Error(), 500), nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(responseBody),
	}, nil
}

// createErrorResponse는 에러 응답을 생성합니다.
func createErrorResponse(headers map[string]string, message string, statusCode int) Response {
	headers["Content-Type"] = "application/json"
	body, _ := json.Marshal(map[string]string{"error": message})
	return Response{
		StatusCode: statusCode,
		Headers:    headers,
		Body:       string(body),
	}
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
		case "random":
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
	// 여기서 새로 변수를 선언하지 말고 전역 변수를 사용하도록 수정
	if os.Getenv("S3_BUCKET_NAME") == "" || os.Getenv("S3_OBJECT_KEY") == "" {
		return nil, errors.New("S3 설정이 없습니다")
	}

	// 디버깅을 위한 로그는 유지
	fmt.Printf("S3 설정 확인:\n")
	fmt.Printf("Bucket: %s\n", os.Getenv("S3_BUCKET_NAME"))
	fmt.Printf("Key: %s\n", os.Getenv("S3_OBJECT_KEY"))
	fmt.Printf("AWS Region: %s\n", os.Getenv("AWS_REGION"))
	fmt.Printf("AWS Access Key ID: %s\n", os.Getenv("AWS_ACCESS_KEY_ID")[:5]+"...")

	return s3client.LoadDataFromS3(
		os.Getenv("S3_BUCKET_NAME"),
		os.Getenv("S3_OBJECT_KEY"),
	)
}

// Lambda handler를 일반 HTTP 서버로 변경
func main() {
	if os.Getenv("AWS_LAMBDA_RUNTIME_API") != "" {
		// Lambda 환경일 때
		lambda.Start(HandleRequest)
	} else {
		// 로컬 환경일 때
		http.HandleFunc("/api/powerball", func(w http.ResponseWriter, r *http.Request) {
			// CORS 헤더 설정
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			w.Header().Set("Content-Type", "application/json")
			// OPTIONS 요청 처리
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			// r.Body를 문자열로 변환
			bodyBytes, err := io.ReadAll(r.Body)
			if err != nil {
				http.Error(w, "요청 본문을 읽는데 실패했습니다", http.StatusBadRequest)
				return
			}

			// 기존 Lambda 핸들러 로직 실행
			response, err := HandleRequest(context.Background(), events.APIGatewayProxyRequest{
				Body: string(bodyBytes),
				// 필요한 다른 요청 정보 설정
			})

			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}

			w.Write([]byte(response.Body))
		})

		fmt.Println("서버가 8080 포트에서 시작됩니다...")
		http.ListenAndServe(":8080", nil)
	}
}
