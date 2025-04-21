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

// LoadAllDataFromS3는 모든 시기의 파워볼 데이터를 로드합니다.
// func LoadAllDataFromS3(bucketName, keyAfter2015, key2012to2015, keyBefore2012 string) ([]models.PowerballDraw, error) {
// 	// AWS 설정 로드
// 	cfg, err := config.LoadDefaultConfig(context.TODO())
// 	if err != nil {
// 		return nil, err
// 	}

// 	// S3 클라이언트 생성
// 	client := s3.NewFromConfig(cfg)

// 	var allDraws []models.PowerballDraw

// 	// 2015년 이후 데이터 로드
// 	draws2015, err := loadSingleFile(client, bucketName, keyAfter2015)
// 	if err == nil {
// 		allDraws = append(allDraws, draws2015...)
// 	}

// 	// 2012-2015년 데이터 로드
// 	draws2012to2015, err := loadSingleFile(client, bucketName, key2012to2015)
// 	if err == nil {
// 		allDraws = append(allDraws, draws2012to2015...)
// 	}

// 	// 2012년 이전 데이터 로드
// 	drawsBefore2012, err := loadSingleFile(client, bucketName, keyBefore2012)
// 	if err == nil {
// 		allDraws = append(allDraws, drawsBefore2012...)
// 	}

// 	return allDraws, nil
// }

// 단일 파일 로드 헬퍼 함수
// func loadSingleFile(client *s3.Client, bucketName, key string) ([]models.PowerballDraw, error) {
// 	if key == "" {
// 		return []models.PowerballDraw{}, nil
// 	}

// 	result, err := client.GetObject(context.TODO(), &s3.GetObjectInput{
// 		Bucket: &bucketName,
// 		Key:    &key,
// 	})
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer result.Body.Close()

// 	var draws []models.PowerballDraw
// 	if err := json.NewDecoder(result.Body).Decode(&draws); err != nil {
// 		return nil, err
// 	}

// 	return draws, nil
// }
