package mocks

import (
	"board-server/internal/domain"

	"github.com/stretchr/testify/mock"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NoticeRepository struct {
	mock.Mock
}

// Create mocks the Create method
func (m *NoticeRepository) Create(notice *domain.Notice) error {
	args := m.Called(notice)
	return args.Error(0)
}

// FindAll mocks the FindAll method
func (m *NoticeRepository) FindAll(page, limit int) ([]*domain.Notice, int64, error) {
	args := m.Called(page, limit)
	if args.Get(0) == nil {
		return nil, args.Get(1).(int64), args.Error(2)
	}
	return args.Get(0).([]*domain.Notice), args.Get(1).(int64), args.Error(2)
}

// FindUserByID mocks the FindUserByID method
func (m *NoticeRepository) FindUserByID(id primitive.ObjectID) (*domain.User, error) {
	args := m.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.User), args.Error(1)
}

// UpdateUserNotices mocks the UpdateUserNotices method
func (m *NoticeRepository) UpdateUserNotices(userID, noticeID primitive.ObjectID) error {
	args := m.Called(userID, noticeID)
	return args.Error(0)
}

// FindSessionByID mocks the FindSessionByID method
func (m *NoticeRepository) FindSessionByID(sessionID string) (string, error) {
	args := m.Called(sessionID)
	return args.String(0), args.Error(1)
}

// FindByNoticeID mocks the FindByNoticeID method
func (m *NoticeRepository) FindByNoticeID(timestamp string) (*domain.Notice, error) {
	args := m.Called(timestamp)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.Notice), args.Error(1)
}
