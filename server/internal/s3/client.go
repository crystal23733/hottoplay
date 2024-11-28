package s3

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"sync"
	"time"

	"server/internal/models"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// S3ClientInterface는 S3 클라이언트의 인터페이스를 정의합니다.
type S3ClientInterface interface {
	LoadLottoData(ctx context.Context) ([]models.LottoData, error)
}

// S3Client는 S3 버킷과의 상호작용을 담당하는 클라이언트입니다.
type S3Client struct {
	client *s3.Client
	bucket string
	prefix string
}

// NewS3Client는 새로운 S3Client 인스턴스를 생성합니다.
func NewS3Client(bucket, region, prefix string) (*S3Client, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region))
	if err != nil {
		return nil, fmt.Errorf("S3 설정 로드 실패: %v", err)
	}

	client := s3.NewFromConfig(cfg)
	return &S3Client{
		client: client,
		bucket: bucket,
		prefix: prefix,
	}, nil
}

// LoadLottoData는 S3에서 로또 데이터를 병렬로 로드합니다.
func (s *S3Client) LoadLottoData(ctx context.Context) ([]models.LottoData, error) {
	var allData []models.LottoData
	input := &s3.ListObjectsV2Input{
		Bucket: &s.bucket,
		Prefix: &s.prefix,
	}

	// 동시 요청 수를 제한하는 세마포어 (최대 5개)
	sem := make(chan struct{}, 5)

	for {
		result, err := s.client.ListObjectsV2(ctx, input)
		if err != nil {
			return nil, fmt.Errorf("S3 객체 리스트 조회 실패: %v", err)
		}

		var wg sync.WaitGroup
		dataChan := make(chan models.LottoData, len(result.Contents))
		errorChan := make(chan error, len(result.Contents))

		for _, obj := range result.Contents {
			wg.Add(1)
			objKey := *obj.Key
			go func() {
				// 세마포어로 동시 요청 제한
				sem <- struct{}{}
				defer func() { <-sem }()
				defer wg.Done()

				input := &s3.GetObjectInput{
					Bucket: &s.bucket,
					Key:    &objKey,
				}

				// 재시도 로직 추가
				var output *s3.GetObjectOutput
				for retries := 0; retries < 3; retries++ {
					output, err = s.client.GetObject(ctx, input)
					if err == nil {
						break
					}
					// 실패 시 잠시 대기 후 재시도
					time.Sleep(time.Duration(retries+1) * 500 * time.Millisecond)
				}
				if err != nil {
					errorChan <- fmt.Errorf("S3 객체 조회 실패 (키: %s): %v", objKey, err)
					return
				}
				defer output.Body.Close()

				data, err := io.ReadAll(output.Body)
				if err != nil {
					errorChan <- fmt.Errorf("데이터 읽기 실패 (키: %s): %v", objKey, err)
					return
				}

				var lottoData models.LottoData
				if err := json.Unmarshal(data, &lottoData); err != nil {
					errorChan <- fmt.Errorf("JSON 파싱 실패 (키: %s): %v", objKey, err)
					return
				}

				dataChan <- lottoData
			}()
		}

		go func() {
			wg.Wait()
			close(dataChan)
			close(errorChan)
		}()

		// 에러 체크를 먼저 수행
		for err := range errorChan {
			if err != nil {
				return nil, err
			}
		}

		// 에러가 없는 경우에만 데이터 수집
		for data := range dataChan {
			allData = append(allData, data)
		}

		if result.IsTruncated == nil || !*result.IsTruncated {
			break
		}

		input.ContinuationToken = result.NextContinuationToken
	}

	return allData, nil
}
