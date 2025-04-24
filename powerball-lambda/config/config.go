package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	S3BucketName string
	// 현재 2015년 이후 데이터
	S3ObjectKey string
	// 2012-2015년 데이터
	S3ObjectKey2012to2015 string
	// 2012년 이전 데이터
	S3ObjectKeyBefore2012 string

	APIEncryptionKey string
	EncryptResponse  bool
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		if os.Getenv("AWS_LAMBDA_RUNTIME_API") == "" {
			return nil, err
		}
	}

	encryptResponse := false
	if os.Getenv("API_ENCRYPT_RESPONSE") == "true" {
		encryptResponse = true
	}

	return &Config{
		S3BucketName:          os.Getenv("S3_BUCKET_NAME"),
		S3ObjectKey:           os.Getenv("S3_OBJECT_KEY"),
		S3ObjectKey2012to2015: os.Getenv("S3_OBJECT_KEY_2012_TO_2015"),
		S3ObjectKeyBefore2012: os.Getenv("S3_OBJECT_KEY_BEFORE_2012"),
		APIEncryptionKey:      os.Getenv("API_ENCRYPTION_KEY"),
		EncryptResponse:       encryptResponse,
	}, nil
}
