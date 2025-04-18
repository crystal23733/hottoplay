package handlers

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"megamillions-lambda/internal/cache"
	"megamillions-lambda/internal/generator"
	"megamillions-lambda/internal/models"
	"megamillions-lambda/internal/statistics"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/events"
)

const (
	pathGenerate        = "/generate"
	pathStatistics      = "/statistics"
	pathDrawList        = "/draws"
	pathDrawDetail      = "/draw"
	pathNumberFrequency = "/number-frequency"
)

// Handler는 모든 요청을 처리하는 핸들러입니다.
type Handler struct {
	cache           *cache.Cache
	numberGenerator *generator.Generator
}

type GenerateRequest struct {
	// Method는 번호 생성 방식을 지정합니다.
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
		"Access-Control-Allow-Origin":      "https://hottoplay.com",
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Methods":     "OPTIONS,POST",
		"Access-Control-Allow-Headers":     "Content-Type",
		"Access-Control-Allow-Credentials": "true",
	}

	// OPTIONS 요청 처리
	if request.HTTPMethod == "OPTIONS" {
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       "",
		}, nil
	}

	switch request.Path {
	case pathGenerate:
		var generateRequest GenerateRequest
		if err := json.Unmarshal([]byte(request.Body), &generateRequest); err != nil {
			return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
		}
		return h.handleGenerateNumbers(generateRequest, headers)
	case pathStatistics:
		return h.HandleStatisticsRequest(ctx, request)
	case pathDrawList:
		return h.HandleDrawListRequest(ctx, request)
	case pathDrawDetail:
		return h.HandleDrawDetailRequest(ctx, request)
	case pathNumberFrequency:
		return h.HandleNumberFrequencyRequest(ctx, request)
	default:
		return createErrorResponse(headers, "잘못된 경로입니다", 404), nil
	}
}

func (h *Handler) handleGenerateNumbers(request GenerateRequest, headers map[string]string) (Response, error) {
	if err := validateRequest(request); err != nil {
		return createErrorResponse(headers, err.Error(), 400), nil
	}

	// 중요: 여기서 최신 데이터만 사용하도록 ensureDataLoaded 함수 호출
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
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Origin":      "https://hottoplay.com",
		"Access-Control-Allow-Methods":     "OPTIONS,POST",
		"Access-Control-Allow-Headers":     "Content-Type",
		"Access-Control-Allow-Credentials": "true",
	}

	// OPTIONS 요청 처리
	if request.HTTPMethod == "OPTIONS" {
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       "",
		}, nil
	}

	var statsRequest StatisticsRequest
	if err := json.Unmarshal([]byte(request.Body), &statsRequest); err != nil {
		return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
	}

	// 중요: 최신 데이터만 사용
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
// 중요: 이 함수는 최신 데이터만 사용하도록 수정되었습니다.
func (h *Handler) ensureDataLoaded() error {
	// 최신 데이터만 가져오기
	draws, valid := h.cache.Get()
	if !valid {
		return errors.New("캐시된 데이터가 없거나 만료되었습니다")
	}

	// 생성기가 없거나 데이터가 업데이트되면 새로 생성
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

// HandleDrawListRequest는 회차 목록 요청을 처리합니다.
func (h *Handler) HandleDrawListRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	headers := map[string]string{
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Origin":      "https://hottoplay.com",
		"Access-Control-Allow-Methods":     "OPTIONS,POST",
		"Access-Control-Allow-Headers":     "Content-Type",
		"Access-Control-Allow-Credentials": "true",
	}

	// OPTIONS 요청 처리
	if request.HTTPMethod == "OPTIONS" {
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       "",
		}, nil
	}

	var req models.DrawListRequest
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
	}

	// draws API에서는 전체 데이터 사용
	draws, valid := h.cache.GetAllDraws()
	// 전체 데이터가 없으면 최신 데이터로 폴백
	if !valid {
		draws, valid = h.cache.Get()
		if !valid {
			return createErrorResponse(headers, "데이터를 불러올 수 없습니다", 500), nil
		}
	}

	// 필터링 적용
	filteredDraws := draws

	// SearchTerm이 있거나 날짜 필터가 있는 경우에만 필터링 적용
	if req.SearchTerm != "" || req.Year > 0 || req.Month > 0 || req.Day > 0 ||
		req.StartDate != "" || req.EndDate != "" || req.Number > 0 {
		filteredDraws = h.searchDraws(draws, req)
	}

	// 기본값 설정
	if req.PageSize <= 0 {
		req.PageSize = 10
	}
	if req.Page <= 0 {
		req.Page = 1
	}

	totalCount := len(filteredDraws)
	startIdx := (req.Page - 1) * req.PageSize
	endIdx := startIdx + req.PageSize
	if endIdx > totalCount {
		endIdx = totalCount
	}
	if startIdx >= totalCount {
		startIdx = 0
		endIdx = 0
	}

	pagedDraws := filteredDraws
	if startIdx < endIdx {
		pagedDraws = filteredDraws[startIdx:endIdx]
	} else {
		pagedDraws = []models.MegaMillionsDraw{}
	}

	// 응답 생성
	summaries := make([]models.DrawSummary, len(pagedDraws))
	for i, draw := range pagedDraws {
		jackpotWinners := 0
		if len(draw.PrizeBreakdown) > 0 {
			jackpotWinners = draw.PrizeBreakdown[0].Winners
		}

		summaries[i] = models.DrawSummary{
			Date:             draw.Date,
			WhiteNumbers:     draw.WhiteNumbers,
			MegaBall:         draw.MegaBall,
			MegaPlier:        draw.MegaPlier,
			EstimatedJackpot: draw.EstimatedJackpot,
			JackpotWinners:   jackpotWinners,
		}
	}

	response := models.DrawListResponse{
		Draws:      summaries,
		TotalCount: totalCount,
		Page:       req.Page,
		PageSize:   req.PageSize,
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

// HandleDrawDetailRequest는 특정 회차 상세 정보 요청을 처리합니다.
func (h *Handler) HandleDrawDetailRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	headers := map[string]string{
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Origin":      "https://hottoplay.com",
		"Access-Control-Allow-Methods":     "OPTIONS,POST",
		"Access-Control-Allow-Headers":     "Content-Type",
		"Access-Control-Allow-Credentials": "true",
	}

	// OPTIONS 요청 처리
	if request.HTTPMethod == "OPTIONS" {
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       "",
		}, nil
	}

	var req models.DrawDetailRequest
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return createErrorResponse(headers, "잘못된 요청 형식입니다", 400), nil
	}

	if req.Date == "" {
		return createErrorResponse(headers, "날짜를 지정해야 합니다", 400), nil
	}

	// 모든 시대의 데이터 사용
	draws, valid := h.cache.GetAllDraws()
	if !valid {
		draws, valid = h.cache.Get()
		if !valid {
			return createErrorResponse(headers, "데이터를 불러올 수 없습니다", 500), nil
		}
	}

	// 날짜로 회차 찾기
	var draw *models.MegaMillionsDraw
	for i := range draws {
		if draws[i].Date == req.Date {
			draw = &draws[i]
			break
		}
	}

	if draw == nil {
		return createErrorResponse(headers, "해당 날짜의 추첨 결과를 찾을 수 없습니다", 404), nil
	}

	// 전체 회차 정보 반환
	responseBody, err := json.Marshal(draw)
	if err != nil {
		return createErrorResponse(headers, "응답 생성 실패: "+err.Error(), 500), nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(responseBody),
	}, nil
}

// HandleNumberFrequencyRequest는 번호 빈도 요청을 처리합니다.
func (h *Handler) HandleNumberFrequencyRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	headers := map[string]string{
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Origin":      "https://hottoplay.com",
		"Access-Control-Allow-Methods":     "OPTIONS,POST",
		"Access-Control-Allow-Headers":     "Content-Type",
		"Access-Control-Allow-Credentials": "true",
	}

	// OPTIONS 요청 처리
	if request.HTTPMethod == "OPTIONS" {
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       "",
		}, nil
	}

	// 중요: 최신 데이터만 사용
	if err := h.ensureDataLoaded(); err != nil {
		return createErrorResponse(headers, "데이터 로드 실패: "+err.Error(), 500), nil
	}

	draws, valid := h.cache.Get()
	if !valid {
		return createErrorResponse(headers, "데이터를 불러올 수 없습니다", 500), nil
	}

	// 번호별 빈도 계산
	whiteFrequency := make(map[int]int)
	megaFrequency := make(map[int]int)

	// 현재 규칙 가져오기
	currentRules, valid := h.cache.GetCurrentRules()
	if !valid {
		// 기본값 설정
		currentRules = models.Rules{
			WhiteBallRange: []int{1, 70},
			MegaBallRange:  []int{1, 24},
		}
	}

	// 빈도 계산
	for _, draw := range draws {
		// 흰 공 번호 빈도
		for _, num := range draw.WhiteNumbers {
			whiteFrequency[num]++
		}

		// 메가볼 번호 빈도
		megaFrequency[draw.MegaBall]++
	}

	// 맵을 슬라이스로 변환
	whiteBalls := make([]models.NumberFrequency, 0, currentRules.WhiteBallRange[1])
	for num := currentRules.WhiteBallRange[0]; num <= currentRules.WhiteBallRange[1]; num++ {
		whiteBalls = append(whiteBalls, models.NumberFrequency{
			Number: num,
			Count:  whiteFrequency[num],
		})
	}

	megaBalls := make([]models.NumberFrequency, 0, currentRules.MegaBallRange[1])
	for num := currentRules.MegaBallRange[0]; num <= currentRules.MegaBallRange[1]; num++ {
		megaBalls = append(megaBalls, models.NumberFrequency{
			Number: num,
			Count:  megaFrequency[num],
		})
	}

	response := models.NumberFrequencyResponse{
		WhiteBalls: whiteBalls,
		MegaBalls:  megaBalls,
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

// searchDraws는 주어진 조건에 맞는 회차를 검색합니다.
func (h *Handler) searchDraws(draws []models.MegaMillionsDraw, req models.DrawListRequest) []models.MegaMillionsDraw {
	result := make([]models.MegaMillionsDraw, 0)

	// 날짜 파싱 함수
	parseDate := func(dateStr string) (time.Time, error) {
		layouts := []string{
			"January 2, 2006",
			"Jan 2, 2006",
		}

		var parsedTime time.Time
		var err error

		for _, layout := range layouts {
			parsedTime, err = time.Parse(layout, dateStr)
			if err == nil {
				return parsedTime, nil
			}
		}

		return time.Time{}, errors.New("날짜 형식을 파싱할 수 없습니다")
	}

	// 날짜 범위 검색을 위한 변수
	var startTime, endTime time.Time
	var err error
	hasStartDate := req.StartDate != ""
	hasEndDate := req.EndDate != ""

	// 시작/종료 날짜 파싱
	if hasStartDate {
		startTime, err = parseDate(req.StartDate)
		if err != nil {
			hasStartDate = false
		}
	}

	if hasEndDate {
		endTime, err = parseDate(req.EndDate)
		if err != nil {
			hasEndDate = false
		}
	}

	for _, draw := range draws {
		include := true

		// 텍스트 기반 검색
		if req.SearchTerm != "" {
			textMatch := strings.Contains(strings.ToLower(draw.Date), strings.ToLower(req.SearchTerm))
			if !textMatch {
				// 번호 검색
				searchNumStr := req.SearchTerm
				searchNum := 0
				if _, err := fmt.Sscanf(searchNumStr, "%d", &searchNum); err == nil {
					numFound := false
					for _, num := range draw.WhiteNumbers {
						if num == searchNum {
							numFound = true
							break
						}
					}
					if !numFound && draw.MegaBall != searchNum {
						include = false
					}
				} else {
					include = false
				}
			}
		}

		// 날짜 파싱
		drawTime, err := parseDate(draw.Date)
		if err != nil {
			continue
		}

		// 날짜 범위 필터링
		if hasStartDate && drawTime.Before(startTime) {
			include = false
		}

		if hasEndDate && drawTime.After(endTime) {
			include = false
		}

		// 연도 필터링
		if req.Year > 0 && drawTime.Year() != req.Year {
			include = false
		}

		// 월 필터링
		if req.Month > 0 && int(drawTime.Month()) != req.Month {
			include = false
		}

		// 일 필터링
		if req.Day > 0 && drawTime.Day() != req.Day {
			include = false
		}

		// 특정 번호 검색
		if req.Number > 0 {
			numFound := false
			for _, num := range draw.WhiteNumbers {
				if num == req.Number {
					numFound = true
					break
				}
			}
			if !numFound && draw.MegaBall != req.Number {
				include = false
			}
		}

		if include {
			result = append(result, draw)
		}
	}

	return result
}
