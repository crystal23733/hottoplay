package s3client

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"megamillions-lambda/internal/models"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go/aws"
)

// LoadDataFromS3는 S3에서 메가밀리언 추첨 데이터를 로드합니다.
func LoadDataFromS3(bucketName, objectKey string) ([]models.MegaMillionsDraw, error) {
	if bucketName == "" || objectKey == "" {
		return nil, fmt.Errorf("버킷 이름 또는 객체 키가 비어있습니다")
	}

	// 컨텍스트 생성
	ctx := context.Background()

	// AWS 설정 로드
	cfg, err := config.LoadDefaultConfig(ctx, config.WithRegion("us-east-1"))
	if err != nil {
		return nil, fmt.Errorf("AWS 설정 로드 실패: %v", err)
	}

	// S3 클라이언트 생성
	client := s3.NewFromConfig(cfg)

	// 객체 가져오기
	result, err := client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		return nil, fmt.Errorf("S3 객체 가져오기 실패: %v", err)
	}
	defer result.Body.Close()

	// 객체 데이터 읽기
	body, err := io.ReadAll(result.Body)
	if err != nil {
		return nil, fmt.Errorf("S3 객체 데이터 읽기 실패: %v", err)
	}

	// JSON 디코딩
	var draws []models.MegaMillionsDraw
	if err := json.Unmarshal(body, &draws); err != nil {
		return nil, fmt.Errorf("JSON 디코딩 실패: %v", err)
	}

	return draws, nil
}

// LoadAllDataFromS3는 모든 시대의 메가밀리언 데이터를 S3에서 로드합니다.
func LoadAllDataFromS3(
	bucketName string,
	objectKey string,
	objectKey1999 string,
	objectKey2002 string,
	objectKey2005 string,
	objectKey2013 string,
	objectKey2017 string,
	objectKey2025 string,
	objectKeyCurrent string,
) ([]models.MegaMillionsDraw, error) {
	allDraws := make([]models.MegaMillionsDraw, 0)

	// 각 시대별 데이터 로드 함수
	loadEraData := func(key string) ([]models.MegaMillionsDraw, error) {
		if key == "" {
			return nil, nil
		}
		return LoadDataFromS3(bucketName, key)
	}

	// 각 시대별 데이터 로드 및 병합
	for _, key := range []string{
		objectKey,
		objectKey1999,
		objectKey2002,
		objectKey2005,
		objectKey2013,
		objectKey2017,
		objectKey2025,
		objectKeyCurrent,
	} {
		if key == "" {
			continue
		}

		draws, err := loadEraData(key)
		if err != nil {
			// 오류 로깅만 하고 계속 진행
			fmt.Printf("Warning: 시대별 데이터 로드 실패 (%s): %v\n", key, err)
			continue
		}

		allDraws = append(allDraws, draws...)
	}

	return allDraws, nil
}
