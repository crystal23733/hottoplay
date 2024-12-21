package mongodb

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/integration/mtest"
)

func TestNoticeRepository_FindAll(t *testing.T) {
	mt := mtest.New(t, mtest.NewOptions().ClientType(mtest.Mock))

	mt.Run("성공적인 조회", func(mt *mtest.T) {
		// 테스트 데이터 준비
		noticeID := primitive.NewObjectID()
		authorID := primitive.NewObjectID()
		now := time.Now()

		// count 응답 설정
		countResponse := mtest.CreateCursorResponse(1, "foo.bar", mtest.FirstBatch, bson.D{
			{Key: "n", Value: 1},
		})

		// find 응답 설정
		first := mtest.CreateCursorResponse(1, "foo.bar", mtest.FirstBatch, bson.D{
			{Key: "_id", Value: noticeID},
			{Key: "title", Value: "테스트 공지사항"},
			{Key: "author_id", Value: authorID},
			{Key: "created_at", Value: now},
			{Key: "timestamp", Value: now.Format(time.RFC3339)},
		})
		killCursors := mtest.CreateCursorResponse(0, "foo.bar", mtest.NextBatch)

		mt.AddMockResponses(countResponse, first, killCursors)

		// 레포지토리 생성
		repo := NewNoticeRepository(mt.DB)

		// 테스트 실행
		notices, total, err := repo.FindAll(1, 10)

		// 검증
		assert.NoError(t, err)
		assert.Equal(t, int64(1), total)
		assert.Len(t, notices, 1)
		if len(notices) > 0 {
			assert.Equal(t, noticeID, notices[0].ID)
			assert.Equal(t, "테스트 공지사항", notices[0].Title)
		}
	})

	mt.Run("데이터베이스 에러", func(mt *mtest.T) {
		// 에러 응답 설정
		mt.AddMockResponses(bson.D{{Key: "ok", Value: 0}})

		// 레포지토리 생성
		repo := NewNoticeRepository(mt.DB)

		// 테스트 실행
		notices, total, err := repo.FindAll(1, 10)

		// 검증
		assert.Error(t, err)
		assert.Nil(t, notices)
		assert.Equal(t, int64(0), total)
	})

	mt.Run("빈 결과", func(mt *mtest.T) {
		// count 응답 설정 (0개)
		countResponse := mtest.CreateCursorResponse(1, "foo.bar", mtest.FirstBatch, bson.D{
			{Key: "n", Value: 0},
		})

		// 빈 결과 응답 설정
		emptyResult := mtest.CreateCursorResponse(0, "foo.bar", mtest.FirstBatch)
		killCursors := mtest.CreateCursorResponse(0, "foo.bar", mtest.NextBatch)

		mt.AddMockResponses(countResponse, emptyResult, killCursors)

		// 레포지토리 생성
		repo := NewNoticeRepository(mt.DB)

		// 테스트 실행
		notices, total, err := repo.FindAll(1, 10)

		// 검증
		assert.NoError(t, err)
		assert.Equal(t, int64(0), total)
		assert.Empty(t, notices)
	})
}
