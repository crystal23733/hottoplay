package handler

import (
	"board-server/internal/domain"
	"board-server/internal/mocks"
	"board-server/pkg/errors"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestNoticeHandler_GetNotices(t *testing.T) {
	// 테스트 케이스 정의
	tests := []struct {
		name          string
		page          string
		limit         string
		mockResponse  []*domain.Notice
		mockTotal     int64
		mockError     error
		expectedCode  int
		expectedTotal int64
	}{
		{
			name:  "정상적인 요청",
			page:  "1",
			limit: "10",
			mockResponse: []*domain.Notice{
				{
					ID:        primitive.NewObjectID(),
					Title:     "테스트 공지사항",
					Author:    primitive.NewObjectID(),
					CreatedAt: time.Now(),
					Timestamp: time.Now().Format(time.RFC3339),
				},
			},
			mockTotal:     1,
			mockError:     nil,
			expectedCode:  http.StatusOK,
			expectedTotal: 1,
		},
		{
			name:          "잘못된 페이지 번호",
			page:          "invalid",
			limit:         "10",
			mockResponse:  nil,
			mockTotal:     0,
			mockError:     nil,
			expectedCode:  http.StatusOK,
			expectedTotal: 0,
		},
		// 추가 테스트 케이스...
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Echo 인스턴스 생성
			e := echo.New()

			// Mock UseCase 생성
			mockUseCase := new(mocks.NoticeUsecase)
			mockUseCase.On("GetNotices", mock.Anything, mock.Anything).Return(tt.mockResponse, tt.mockTotal, tt.mockError)
			mockUseCase.On("GetUserByID", mock.Anything).Return(&domain.User{Name: "테스트 유저"}, nil)

			// 핸들러 생성
			h := NewNoticeHandler(mockUseCase)

			// 테스트 요청 생성
			req := httptest.NewRequest(http.MethodGet, "/notices?page="+tt.page+"&limit="+tt.limit, nil)
			rec := httptest.NewRecorder()
			c := e.NewContext(req, rec)

			// 핸들러 실행
			if assert.NoError(t, h.GetNotices(c)) {
				assert.Equal(t, tt.expectedCode, rec.Code)

				// 응답 파싱
				var response NoticeListResponse
				err := json.Unmarshal(rec.Body.Bytes(), &response)
				assert.NoError(t, err)
				assert.Equal(t, tt.expectedTotal, response.Total)
			}
		})
	}
}

func TestNoticeHandler_GetNoticeDetail(t *testing.T) {
	tests := []struct {
		name         string
		timestamp    string
		mockNotice   *domain.Notice
		mockError    error
		expectedCode int
	}{
		{
			name:      "정상적인 상세 조회",
			timestamp: strconv.FormatInt(time.Now().UnixNano(), 10),
			mockNotice: &domain.Notice{
				ID:        primitive.NewObjectID(),
				Title:     "테스트 공지사항",
				Content:   "테스트 내용",
				Author:    primitive.NewObjectID(),
				CreatedAt: time.Now(),
				Timestamp: strconv.FormatInt(time.Now().UnixNano(), 10),
			},
			mockError:    nil,
			expectedCode: http.StatusOK,
		},
		{
			name:         "존재하지 않는 타임스탬프",
			timestamp:    "invalid",
			mockNotice:   nil,
			mockError:    errors.ErrNotFound,
			expectedCode: http.StatusInternalServerError,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			e := echo.New()
			mockUseCase := new(mocks.NoticeUsecase)
			mockUseCase.On("GetNoticeDetail", tt.timestamp).Return(tt.mockNotice, tt.mockError)
			if tt.mockNotice != nil {
				mockUseCase.On("GetUserByID", tt.mockNotice.Author).Return(&domain.User{Name: "테스트 유저"}, nil)
			}

			h := NewNoticeHandler(mockUseCase)

			req := httptest.NewRequest(http.MethodGet, "/notices/"+tt.timestamp, nil)
			rec := httptest.NewRecorder()
			c := e.NewContext(req, rec)
			c.SetParamNames("timestamp")
			c.SetParamValues(tt.timestamp)

			err := h.GetNoticeDetail(c)
			if tt.expectedCode == http.StatusOK {
				assert.NoError(t, err)
				var response NoticeDetailResponse
				err := json.Unmarshal(rec.Body.Bytes(), &response)
				assert.NoError(t, err)
				assert.Equal(t, tt.mockNotice.Title, response.Title)
				assert.Equal(t, tt.mockNotice.Timestamp, response.Timestamp)
			} else {
				assert.Equal(t, tt.expectedCode, rec.Code)
			}
		})
	}
}
