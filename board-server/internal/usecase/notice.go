package usecase

import (
	"board-server/internal/domain"
	"board-server/internal/repository/mongodb"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// NoticeUsecase는 공지사항 관련 비즈니스 로직을 처리하는 인터페이스
type NoticeUsecase interface {
	GetUserByID(userID primitive.ObjectID) (*domain.User, error)
	GetNotices(page, limit int) ([]*domain.Notice, int64, error)
}

// noticeUsecase는 NoticeUsecase 인터페이스를 구현한 구체적인 구현체
type noticeUsecase struct {
	noticeRepo mongodb.NoticeRepository
}

// NewNoticeUsecase는 NoticeUsecase 인터페이스를 구현한 새로운 인스턴스를 생성하는 함수
func NewNoticeUsecase(noticeRepo mongodb.NoticeRepository) NoticeUsecase {
	return &noticeUsecase{
		noticeRepo: noticeRepo,
	}
}

// GetUserByID는 사용자 ID를 받아 사용자 정보를 조회한다.
func (u *noticeUsecase) GetUserByID(userID primitive.ObjectID) (*domain.User, error) {
	return u.noticeRepo.FindUserByID(userID)
}

// GetNotices는 공지사항 목록을 조회하는 함수
func (u *noticeUsecase) GetNotices(page, limit int) ([]*domain.Notice, int64, error) {
	// 페이지 파라미터 유효성 검사
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 20
	} else if limit > 100 {
		limit = 100
	}

	// 레포지토리 계층 호출
	notices, total, err := u.noticeRepo.FindAll(page, limit)
	if err != nil {
		return nil, 0, err
	}

	return notices, total, nil
}
