package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Notice struct {
	ID        primitive.ObjectID `json:"id" bson:"_id"`
	Author    primitive.ObjectID `json:"author_id" bson:"author_id"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time          `json:"updated_at" bson:"updated_at"`
	Title     string             `json:"title" bson:"title"`
	Content   string             `json:"content" bson:"content"`
	Timestamp string             `json:"timestamp" bson:"timestamp"`
}

// User는 사용자의 도메인 모델을 정의한다.
type User struct {
	Notice []primitive.ObjectID `json:"notices" bson:"notices"`
	Name   string               `json:"name" bson:"name"`
}
