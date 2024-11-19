package s3

import (
	"testing"

	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// mockS3API는 테스트를 위한 AWS S3 API 모의 구현체입니다.
type mockS3API struct {
	listObjectsOutput *s3.ListObjectsV2Output
	getObjectOutput   *s3.GetObjectOutput
	err               error
}

func TestNewS3Client(t *testing.T) {
	tests := []struct {
		name    string
		bucket  string
		region  string
		prefix  string
		wantErr bool
	}{
		{
			name:    "Valid configuration",
			bucket:  "test-bucket",
			region:  "ap-northeast-2",
			prefix:  "lotto/",
			wantErr: false,
		},
		{
			name:    "Empty bucket",
			bucket:  "",
			region:  "ap-northeast-2",
			prefix:  "lotto/",
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			client, err := NewS3Client(tt.bucket, tt.region, tt.prefix)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewS3Client() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantErr && client == nil {
				t.Error("NewS3Client() returned nil client")
			}
		})
	}
}
