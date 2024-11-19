package config

import (
	"log"

	"github.com/spf13/viper"
)

// Config는 애플리케이션 설정을 담는 구조체입니다.
type Config struct {
	S3Bucket string // S3 버킷 이름
	S3Prefix string // S3 경로
	S3Region string // S3 리전
	AppPort  string // 애플리케이션 실행 포트
	APIKey   string // API 인증 키
}

// LoadConfig는 환경 변수에서 설정을 로드합니다.
func LoadConfig() (*Config, error) {
	viper.SetConfigFile(".env")
	if err := viper.ReadInConfig(); err != nil {
		log.Printf(".env 파일을 읽을 수 없습니다: %v\n", err)
	}

	viper.AutomaticEnv()

	return &Config{
		S3Bucket: viper.GetString("S3_BUCKET"),
		S3Region: viper.GetString("S3_REGION"),
		S3Prefix: viper.GetString("S3_PREFIX"),
		AppPort:  viper.GetString("APP_PORT"),
		APIKey:   viper.GetString("API_KEY"),
	}, nil
}
