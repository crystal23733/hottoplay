package config

import (
	"os"
	"testing"
)

func TestLoadConfig(t *testing.T) {
	// 테스트용 환경 변수 설정
	os.Setenv("S3_BUCKET", "test-bucket")
	os.Setenv("S3_REGION", "test-region")
	os.Setenv("S3_PREFIX", "test-prefix")
	os.Setenv("APP_PORT", "8080")
	os.Setenv("API_KEY", "test-api-key")

	cfg, err := LoadConfig()
	if err != nil {
		t.Errorf("LoadConfig() 에러 발생: %v", err)
	}

	tests := []struct {
		name     string
		got      string
		expected string
	}{
		{"S3_BUCKET", cfg.S3Bucket, "test-bucket"},
		{"S3_REGION", cfg.S3Region, "test-region"},
		{"S3_PREFIX", cfg.S3Prefix, "test-prefix"},
		{"APP_PORT", cfg.AppPort, "8080"},
		{"API_KEY", cfg.APIKey, "test-api-key"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.got != tt.expected {
				t.Errorf("%s = %v, want %v", tt.name, tt.got, tt.expected)
			}
		})
	}
}
