package config_test

import (
	"os"
	"server/config"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLoadConfig(t *testing.T) {
	// 환경 변수를 설정
	os.Setenv("S3_BUCKET", "test-bucket")
	os.Setenv("S3_REGION", "us-west-2")
	os.Setenv("S3_PREFIX", "test-prefix")
	os.Setenv("APP_PORT", "8080")

	// Config 로드
	cfg, err := config.LoadConfig()

	// 에러가 없는지 확인
	assert.NoError(t, err, "환경 변수 로드 중 에러 발생")

	// 환경 변수 값 확인
	assert.Equal(t, "test-bucket", cfg.S3Bucket, "S3_BUCKET 값이 다릅니다")
	assert.Equal(t, "us-west-2", cfg.S3Region, "S3_REGION 값이 다릅니다")
	assert.Equal(t, "test-prefix", cfg.S3Prefix, "S3_PREFIX 값이 다릅니다")
	assert.Equal(t, "8080", cfg.AppPort, "APP_PORT 값이 다릅니다")
}
