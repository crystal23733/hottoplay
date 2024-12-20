package mocks

import (
	"board-server/internal/domain"

	"github.com/stretchr/testify/mock"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type NoticeUsecase struct {
	mock.Mock
}

func (m *NoticeUsecase) GetNotices(page, limit int) ([]*domain.Notice, int64, error) {
	args := m.Called(page, limit)
	return args.Get(0).([]*domain.Notice), args.Get(1).(int64), args.Error(2)
}

func (m *NoticeUsecase) GetUserByID(id primitive.ObjectID) (*domain.User, error) {
	args := m.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.User), args.Error(1)
}
