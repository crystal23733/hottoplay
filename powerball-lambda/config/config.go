package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	S3BucketName string
	S3ObjectKey  string
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		if os.Getenv("AWS_LAMBDA_RUNTIME_API") == "" {
			return nil, err
		}
	}

	return &Config{
		S3BucketName: os.Getenv("S3_BUCKET_NAME"),
		S3ObjectKey:  os.Getenv("S3_OBJECT_KEY"),
	}, nil
}
