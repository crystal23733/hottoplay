package usecase

import (
	"board-server/internal/domain"
	"board-server/internal/mocks"
	"errors"
	"strconv"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func TestNoticeUsecase_GetNotices(t *testing.T) {
	tests := []struct {
		name          string
		page          int
		limit         int
		mockNotices   []*domain.Notice
		mockTotal     int64
		mockError     error
		expectedTotal int64
		expectError   bool
	}{
		{
			name:  "정상적인 조회",
			page:  1,
			limit: 10,
			mockNotices: []*domain.Notice{
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
			expectedTotal: 1,
			expectError:   false,
		},
		// 추가 테스트 케이스...
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Mock Repository 생성
			mockRepo := new(mocks.NoticeRepository)
			mockRepo.On("FindAll", tt.page, tt.limit).Return(tt.mockNotices, tt.mockTotal, tt.mockError)

			// Usecase 생성
			u := NewNoticeUsecase(mockRepo)

			// 테스트 실행
			notices, total, err := u.GetNotices(tt.page, tt.limit)

			if tt.expectError {
				assert.Error(t, err)
			} else {
				assert.NoError(t, err)
				assert.Equal(t, tt.expectedTotal, total)
				assert.Equal(t, len(tt.mockNotices), len(notices))
			}
		})
	}
}

func TestNoticeUsecase_GetNoticeDetail(t *testing.T) {
	tests := []struct {
		name        string
		timestamp   string
		mockNotice  *domain.Notice
		mockError   error
		expectError bool
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
			mockError:   nil,
			expectError: false,
		},
		{
			name:        "존재하지 않는 타임스탬프",
			timestamp:   "invalid",
			mockNotice:  nil,
			mockError:   errors.New("not found"),
			expectError: true,
		},
		{
			name:        "빈 타임스탬프",
			timestamp:   "",
			mockNotice:  nil,
			mockError:   errors.New("invalid input"),
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mockRepo := new(mocks.NoticeRepository)
			mockRepo.On("FindByNoticeID", tt.timestamp).Return(tt.mockNotice, tt.mockError)

			u := NewNoticeUsecase(mockRepo)
			notice, err := u.GetNoticeDetail(tt.timestamp)

			if tt.expectError {
				assert.Error(t, err)
				assert.Nil(t, notice)
			} else {
				assert.NoError(t, err)
				assert.NotNil(t, notice)
				assert.Equal(t, tt.mockNotice.Title, notice.Title)
				assert.Equal(t, tt.mockNotice.Timestamp, notice.Timestamp)
			}
		})
	}
}
