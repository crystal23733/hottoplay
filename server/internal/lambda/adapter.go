package lambda

import (
	"context"
	"encoding/json"
	"server/internal/service"
	"strconv"
	"strings"

	"github.com/aws/aws-lambda-go/events"
)

// LambdaAdapter는 로또 서비스를 Lambda 형식으로 제공합니다.
type LambdaAdapter struct {
	lottoService service.LottoServiceInterface
	apiKey       string
}

// NewLambdaAdapter는 새로운 Lambda 어댑터를 생성합니다.
func NewLambdaAdapter(lottoService service.LottoServiceInterface, apiKey string) *LambdaAdapter {
	return &LambdaAdapter{
		lottoService: lottoService,
		apiKey:       apiKey,
	}
}

// Response는 Lambda API Gateway 응답 구조체입니다.
type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

// HandleRequest는 Lambda 진입점입니다.
func (a *LambdaAdapter) HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (Response, error) {
	// CORS 헤더 설정 - credentials가 include일 때는 특정 origin 사용
	origin := request.Headers["Origin"]
	if origin == "" {
		origin = request.Headers["origin"]
	}
	// hottoplay.com 도메인만 허용
	if origin != "https://hottoplay.com" && origin != "https://www.hottoplay.com" {
		origin = "https://hottoplay.com"
	}

	headers := map[string]string{
		"Access-Control-Allow-Origin":      origin,
		"Content-Type":                     "application/json",
		"Access-Control-Allow-Methods":     "OPTIONS,POST,GET",
		"Access-Control-Allow-Headers":     "Content-Type,X-API-KEY,Authorization",
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

	// API 키 검증 (헬스체크와 공지사항 제외)
	if !strings.HasSuffix(request.Path, "/lotto") && !strings.Contains(request.Path, "/notices") && !a.validateAPIKey(request) {
		return Response{
			StatusCode: 401,
			Headers:    headers,
			Body:       `{"error": "Unauthorized"}`,
		}, nil
	}

	// 경로별 처리 (직접 비즈니스 로직 호출)
	switch {
	case strings.HasSuffix(request.Path, "/lotto/numbers"):
		return a.handleGenerateNumbers(ctx, request, headers)
	case strings.HasSuffix(request.Path, "/lotto/rounds"):
		return a.handleGetRoundNumbers(ctx, request, headers)
	case strings.HasSuffix(request.Path, "/lotto/populars"):
		return a.handleGetPopularWatch(ctx, request, headers)
	case strings.HasSuffix(request.Path, "/lotto"):
		// 헬스체크
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       `{"message": "Hello, World!"}`,
		}, nil
	case strings.Contains(request.Path, "/notices"):
		// Board 서비스 처리
		return a.handleNoticeRequest(ctx, request, headers)
	default:
		return Response{
			StatusCode: 404,
			Headers:    headers,
			Body:       `{"error": "잘못된 경로입니다"}`,
		}, nil
	}
}

// handleGenerateNumbers는 번호 생성 요청을 처리합니다.
func (a *LambdaAdapter) handleGenerateNumbers(ctx context.Context, request events.APIGatewayProxyRequest, headers map[string]string) (Response, error) {
	// 요청 파싱
	var req struct {
		Type           string `json:"type"`
		StatisticsType string `json:"statisticsType"`
	}

	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error": "잘못된 요청 형식입니다"}`,
		}, nil
	}

	var numbers []int
	var err error

	// 서비스 레이어 직접 호출
	switch req.Type {
	case "unique":
		numbers, err = a.lottoService.GenerateUniqueNumbers()
	case "many":
		numbers = a.lottoService.GeneratePopularBasedNumbers()
	case "statistics":
		if req.StatisticsType == "" {
			return Response{
				StatusCode: 400,
				Headers:    headers,
				Body:       `{"error": "통계 타입이 지정되지 않았습니다"}`,
			}, nil
		}
		validTypes := map[string]bool{"hot": true, "cold": true, "balanced": true, "weighted": true}
		if !validTypes[req.StatisticsType] {
			return Response{
				StatusCode: 400,
				Headers:    headers,
				Body:       `{"error": "지원하지 않는 통계 타입입니다"}`,
			}, nil
		}
		numbers, err = a.lottoService.GenerateStatisticsBasedNumbers(req.StatisticsType)
	default:
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error": "지원하지 않는 생성 타입입니다"}`,
		}, nil
	}

	if err != nil {
		response := map[string]string{"error": err.Error()}
		body, _ := json.Marshal(response)
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       string(body),
		}, nil
	}

	response := map[string][]int{"numbers": numbers}
	body, err := json.Marshal(response)
	if err != nil {
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "응답 생성 실패"}`,
		}, nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(body),
	}, nil
}

// handleGetRoundNumbers는 회차별 조회 요청을 처리합니다.
func (a *LambdaAdapter) handleGetRoundNumbers(ctx context.Context, request events.APIGatewayProxyRequest, headers map[string]string) (Response, error) {
	// 쿼리 파라미터에서 round 추출
	roundStr := request.QueryStringParameters["round"]
	if roundStr == "" {
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error": "회차 번호가 필요합니다"}`,
		}, nil
	}

	roundNumber, err := strconv.Atoi(roundStr)
	if err != nil {
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error": "유효하지 않은 회차 번호입니다"}`,
		}, nil
	}

	// 서비스 레이어 직접 호출
	result, err := a.lottoService.GetRoundNumbers(roundNumber)
	if err != nil {
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "` + err.Error() + `"}`,
		}, nil
	}

	body, err := json.Marshal(result)
	if err != nil {
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "응답 생성 실패"}`,
		}, nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(body),
	}, nil
}

// handleGetPopularWatch는 인기번호 조회 요청을 처리합니다.
func (a *LambdaAdapter) handleGetPopularWatch(ctx context.Context, request events.APIGatewayProxyRequest, headers map[string]string) (Response, error) {
	// 쿼리 파라미터에서 popular 추출
	popular := request.QueryStringParameters["popular"]

	// 서비스 레이어 직접 호출
	result, err := a.lottoService.GetPopularWatch(popular)
	if err != nil {
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "` + err.Error() + `"}`,
		}, nil
	}

	body, err := json.Marshal(result)
	if err != nil {
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "응답 생성 실패"}`,
		}, nil
	}

	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(body),
	}, nil
}

// handleNoticeRequest는 공지사항 요청을 처리합니다.
func (a *LambdaAdapter) handleNoticeRequest(ctx context.Context, request events.APIGatewayProxyRequest, headers map[string]string) (Response, error) {
	// 간단한 공지사항 목업 응답 (실제로는 MongoDB 연결이 필요)
	switch {
	case strings.HasSuffix(request.Path, "/notices/"):
		// 헬스체크
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       `{"message": "Board API OK"}`,
		}, nil
	case strings.HasSuffix(request.Path, "/notices/list"):
		// 공지사항 목록
		mockNotices := map[string]interface{}{
			"notices": []map[string]interface{}{
				{
					"id":        "1",
					"title":     "공지사항 1",
					"content":   "공지사항 내용 1",
					"timestamp": "2025-08-28T10:00:00Z",
				},
				{
					"id":        "2",
					"title":     "공지사항 2",
					"content":   "공지사항 내용 2",
					"timestamp": "2025-08-27T10:00:00Z",
				},
			},
			"total": 2,
		}
		body, err := json.Marshal(mockNotices)
		if err != nil {
			return Response{
				StatusCode: 500,
				Headers:    headers,
				Body:       `{"error": "응답 생성 실패"}`,
			}, nil
		}
		return Response{
			StatusCode: 200,
			Headers:    headers,
			Body:       string(body),
		}, nil
	case strings.Contains(request.Path, "/notices/") && !strings.HasSuffix(request.Path, "/notices/") && !strings.HasSuffix(request.Path, "/notices/list"):
		// 특정 공지사항 상세 조회 (/notices/:timestamp)
		pathParts := strings.Split(request.Path, "/")
		if len(pathParts) >= 5 {
			timestamp := pathParts[4] // /api/v1/notices/{timestamp}

			// 목업 상세 데이터
			mockDetail := map[string]interface{}{
				"id":        "1",
				"title":     "공지사항 상세",
				"content":   "요청하신 " + timestamp + " 시점의 공지사항 상세 내용입니다.",
				"timestamp": timestamp,
				"author":    "관리자",
			}

			body, err := json.Marshal(mockDetail)
			if err != nil {
				return Response{
					StatusCode: 500,
					Headers:    headers,
					Body:       `{"error": "응답 생성 실패"}`,
				}, nil
			}
			return Response{
				StatusCode: 200,
				Headers:    headers,
				Body:       string(body),
			}, nil
		}
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error": "잘못된 요청 형식입니다"}`,
		}, nil
	default:
		return Response{
			StatusCode: 404,
			Headers:    headers,
			Body:       `{"error": "지원하지 않는 공지사항 경로입니다"}`,
		}, nil
	}
}

// validateAPIKey는 API 키를 검증합니다.
func (a *LambdaAdapter) validateAPIKey(request events.APIGatewayProxyRequest) bool {
	// 헤더에서 API 키 추출
	apiKey := request.Headers["X-API-Key"]
	if apiKey == "" {
		apiKey = request.Headers["x-api-key"]
	}
	if apiKey == "" {
		if auth := request.Headers["Authorization"]; auth != "" {
			apiKey = strings.TrimPrefix(auth, "Bearer ")
		}
	}

	// 설정된 API 키와 비교
	return apiKey == a.apiKey
}
