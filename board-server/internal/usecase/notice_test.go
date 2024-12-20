package usecase

import (
	"board-server/internal/domain"
	"board-server/internal/mocks"
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
