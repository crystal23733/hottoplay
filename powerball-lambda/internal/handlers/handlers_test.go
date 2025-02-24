package handlers

import (
	"context"
	"encoding/json"
	"powerball-lambda/internal/cache"
	"powerball-lambda/internal/models"
	"testing"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/stretchr/testify/assert"
)

func TestHandleRequest(t *testing.T) {
	// 테스트용 캐시 설정
	testCache := cache.NewCache(1 * time.Hour)
	testCache.Set([]models.PowerballDraw{
		{
			Date:         "Wed, Jan 8, 2025",
			WhiteNumbers: []string{"1", "20", "36", "38", "43"},
			Powerball:    "24",
		},
	})

	handler := NewHandler(testCache, nil)

	t.Run("유효한 요청 처리", func(t *testing.T) {
		request := events.APIGatewayProxyRequest{
			Body: `{"method":"random","count":1}`,
		}

		response, err := handler.HandleRequest(context.Background(), request)
		assert.NoError(t, err)
		assert.Equal(t, 200, response.StatusCode)

		var responseBody map[string]interface{}
		err = json.Unmarshal([]byte(response.Body), &responseBody)
		assert.NoError(t, err)
		assert.Contains(t, responseBody, "numbers")
	})

	t.Run("잘못된 요청 처리", func(t *testing.T) {
		request := events.APIGatewayProxyRequest{
			Body: `{"method":"invalid","count":0}`,
		}

		response, err := handler.HandleRequest(context.Background(), request)
		assert.NoError(t, err)
		assert.Equal(t, 400, response.StatusCode)
	})
}
