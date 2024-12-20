package mongodb

import (
	"board-server/internal/domain"
	"board-server/pkg/errors"
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// NoticeRepository는 Notice 데이터베이스 작업을 위한 인터페이스이다.
type NoticeRepository interface {
	FindUserByID(id primitive.ObjectID) (*domain.User, error)
	FindAll(page, limit int) ([]*domain.Notice, int64, error)
}

// noticeRepository는 NoticeRepository 인터페이스를 구현한다.
type noticeRepository struct {
	db         *mongo.Database
	noticeColl *mongo.Collection
	userColl   *mongo.Collection
}

// NewNoticeRepository는 noticeRepository를 생성하고 반환한다.
func NewNoticeRepository(db *mongo.Database) noticeRepository {
	return noticeRepository{
		db:         db,
		noticeColl: db.Collection("notices"),
		userColl:   db.Collection("users"),
	}
}

// FindUserByID는 주어진 ID로 사용자를 조회한다.
func (r *noticeRepository) FindUserByID(id primitive.ObjectID) (*domain.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user domain.User
	err := r.userColl.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.ErrUserNotFound
		}
		return nil, errors.ErrInternalServer
	}

	return &user, nil
}

// FindAll은 모든 Notice를 조회하고 반환한다.
func (r *noticeRepository) FindAll(page, limit int) ([]*domain.Notice, int64, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// 전체 게시글 조회
	total, err := r.noticeColl.CountDocuments(ctx, bson.M{})
	if err != nil {
		return nil, 0, errors.ErrInternalServer
	}

	// 페이지네이션 적용하여 게시글 조회
	skip := (page - 1) * limit
	opts := options.Find().SetSort(bson.D{{Key: "created_at", Value: -1}}).SetSkip(int64(skip)).SetLimit(int64(limit))

	// @ctx 컨텍스트, bson.M{} 쿼리, opts 옵션
	cursor, err := r.noticeColl.Find(ctx, bson.M{}, opts)
	if err != nil {
		return nil, 0, errors.ErrInternalServer
	}
	defer cursor.Close(ctx)

	// @ctx 컨텍스트, notice 포인터 배열
	var notices []*domain.Notice
	if err = cursor.All(ctx, &notices); err != nil {
		return nil, 0, errors.ErrInternalServer
	}

	return notices, total, nil
}
