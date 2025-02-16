package s3client

import (
	"context"
	"encoding/json"
	"powerball-lambda/internal/models"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// LoadDataFromS3는 S3에서 파워볼 데이터를 로드합니다.
func LoadDataFromS3(bucketName, key string) ([]models.PowerballDraw, error) {
	// AWS 설정 로드
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		return nil, err
	}

	// S3 클라이언트 생성
	client := s3.NewFromConfig(cfg)

	// 객체 가져오기
	result, err := client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: &bucketName,
		Key:    &key,
	})
	if err != nil {
		return nil, err
	}
	defer result.Body.Close()

	// JSON 디코딩
	var draws []models.PowerballDraw
	if err := json.NewDecoder(result.Body).Decode(&draws); err != nil {
		return nil, err
	}

	return draws, nil
}
