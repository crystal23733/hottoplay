package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"powerball-lambda/internal/cache"
	"powerball-lambda/internal/generator"
	"powerball-lambda/internal/models"
	"powerball-lambda/internal/statistics"

	"github.com/aws/aws-lambda-go/events"
)

// Handler는 모든 요청을 처리하는 핸들러입니다.
type Handler struct {
	cache           *cache.Cache
	numberGenerator *generator.Generator
}

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

// StatisticsRequest는 통계 요청의 구조를 정의합니다.
type StatisticsRequest struct {
	Numbers []int `json:"numbers"` // 분석할 번호들
}

// NewHandler는 새로운 Handler 인스턴스를 생성합니다.
func NewHandler(cache *cache.Cache, generator *generator.Generator) *Handler {
	return &Handler{
		cache:           cache,
		numberGenerator: generator,
	}
}

// Response는 API Gateway에 맞춘 응답 구조체입니다.
type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

// HandleRequest는 Lambda 함수의 진입점입니다.
func (h *Handler) HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	headers := map[string]string{
		"Content-Type": "application/json",
	}

	switch request.Path {
	case "/generate":
		var generateRequest GenerateRequest
		if err := json.Unmarshal([]byte(request.Body), &generateRequest); err != nil {
			return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
		}
		return h.handleGenerateNumbers(generateRequest, headers)
	case "/statistics":
		return h.HandleStatisticsRequest(ctx, request)
	default:
		return createErrorResponse(headers, "잘못된 경로입니다", 404), nil
	}
}

func (h *Handler) handleGenerateNumbers(request GenerateRequest, headers map[string]string) (Response, error) {
	if err := validateRequest(request); err != nil {
		return createErrorResponse(headers, err.Error(), 400), nil
	}

	if err := h.ensureDataLoaded(); err != nil {
		return createErrorResponse(headers, "데이터 로드 실패: "+err.Error(), 500), nil
	}

	numbers, err := h.generateNumbers(request)
	if err != nil {
		return createErrorResponse(headers, "번호 생성 실패: "+err.Error(), 500), nil
	}

	response := GenerateResponse{
		Numbers: numbers,
	}

	responseBody, err := json.Marshal(response)
	if err != nil {
		return createErrorResponse(headers, "응답 생성 실패: "+err.Error(), 500), nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(responseBody),
	}, nil
}

// HandleStatisticsRequest는 통계 요청을 처리합니다.
func (h *Handler) HandleStatisticsRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	headers := map[string]string{
		"Content-Type": "application/json",
	}

	var statsRequest StatisticsRequest
	if err := json.Unmarshal([]byte(request.Body), &statsRequest); err != nil {
		return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
	}

	if err := h.ensureDataLoaded(); err != nil {
		return createErrorResponse(headers, "데이터 로드 실패: "+err.Error(), 500), nil
	}

	draws, valid := h.cache.Get()
	if !valid {
		return createErrorResponse(headers, "데이터를 불러올 수 없습니다", 500), nil
	}

	analyzer := statistics.NewAnalyzer(draws)
	response := models.StatisticsResponse{
		NumberStats:      analyzer.GetNumberStatistics(statsRequest.Numbers),
		CombinationStats: analyzer.GetCombinationStatistics(statsRequest.Numbers),
	}

	responseBody, err := json.Marshal(response)
	if err != nil {
		return createErrorResponse(headers, "응답 생성 실패: "+err.Error(), 500), nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(responseBody),
	}, nil
}

// createErrorResponse는 오류 응답을 생성합니다.
func createErrorResponse(headers map[string]string, message string, statusCode int) Response {
	headers["Content-Type"] = "application/json"
	body, _ := json.Marshal(map[string]string{"error": message})
	return Response{
		StatusCode: statusCode,
		Headers:    headers,
		Body:       string(body),
	}
}

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

// ensureDataLoaded는 데이터가 로드되었는지 확인하고, 필요한 경우 생성기를 초기화합니다.
func (h *Handler) ensureDataLoaded() error {
	draws, valid := h.cache.Get()
	if !valid {
		return errors.New("캐시된 데이터가 없거나 만료되었습니다")
	}

	if h.numberGenerator == nil {
		h.numberGenerator = generator.NewGenerator(draws)
	}

	return nil
}

// generateNumbers는 번호 생성을 처리합니다.
func (h *Handler) generateNumbers(request GenerateRequest) ([]models.GeneratedNumbers, error) {
	numbers := make([]models.GeneratedNumbers, 0, request.Count)

	for i := 0; i < request.Count; i++ {
		var number models.GeneratedNumbers
		var err error

		switch request.Method {
		case "random":
			number = h.numberGenerator.GenerateRandom()
		case "hot":
			number = h.numberGenerator.GenerateHotNumbers()
		case "cold":
			number = h.numberGenerator.GenerateColdNumbers()
		case "unique":
			number, err = h.numberGenerator.GenerateUniqueCombination(1000)
			if err != nil {
				return nil, err
			}
		}

		numbers = append(numbers, number)
	}

	return numbers, nil
}
