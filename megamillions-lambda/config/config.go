package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	S3BucketName       string
	S3ObjectKey        string
	S3ObjectKey1999    string // The Big Game 첫 버전 (1996.09.06 - 1999.01.12)
	S3ObjectKey2002    string // The Big Game 두 번째 버전 (1999.01.15 - 2002.05.14)
	S3ObjectKey2005    string // The Big Game Mega Millions (2002.05.17 - 2005.06.21)
	S3ObjectKey2013    string // Mega Millions (2005.06.24 - 2013.10.18)
	S3ObjectKey2017    string // Mega Millions (2013.10.22 - 2017.10.27)
	S3ObjectKey2025    string // Mega Millions (2017.10.31 - 2025.04.04)
	S3ObjectKeyCurrent string // 현재 Mega Millions (2025.04.08 - 현재)
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		if os.Getenv("AWS_LAMBDA_RUNTIME_API") == "" {
			return nil, err
		}
	}

	return &Config{
		S3BucketName:       os.Getenv("S3_BUCKET_NAME"),
		S3ObjectKey:        os.Getenv("S3_OBJECT_KEY"),
		S3ObjectKey1999:    os.Getenv("S3_OBJECT_KEY_1999"),
		S3ObjectKey2002:    os.Getenv("S3_OBJECT_KEY_2002"),
		S3ObjectKey2005:    os.Getenv("S3_OBJECT_KEY_2005"),
		S3ObjectKey2013:    os.Getenv("S3_OBJECT_KEY_2013"),
		S3ObjectKey2017:    os.Getenv("S3_OBJECT_KEY_2017"),
		S3ObjectKey2025:    os.Getenv("S3_OBJECT_KEY_2025"),
		S3ObjectKeyCurrent: os.Getenv("S3_OBJECT_KEY_CURRENT"),
	}, nil
}
