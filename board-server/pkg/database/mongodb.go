package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config는 MongoDB 연결 설정을 담은 구조체이다.
type Config struct {
	URI      string
	Database string
}

// MongoDB는 데이터베이스 연결과 종료를 관리한다.
type MongoDB struct {
	client   *mongo.Client
	database *mongo.Database
}

// Connect는 MongoDB에 연결하고 데이터베이스 인스턴스를 반환한다.
func Connect(cfg Config) (*mongo.Database, *MongoDB, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(cfg.URI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, nil, err
	}

	// 연결 확인
	if err := client.Ping(ctx, nil); err != nil {
		return nil, nil, err
	}

	db := client.Database(cfg.Database)
	mongodb := &MongoDB{
		client:   client,
		database: db,
	}

	return db, mongodb, nil
}

// Disconnect는 MongoDB 연결을 안전하게 종료한다.
func (m *MongoDB) Disconnect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	return m.client.Disconnect(ctx)
}
