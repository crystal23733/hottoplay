package config

import (
	"log"
	"os"

	"github.com/spf13/viper"
)

// Config은 환경변수 설정을 담은 구조체이다.
type Config struct {
	Port         string // 포트 번호
	DB_URL       string
	DB_NAME      string
	Client_URL   string
	ClientURLWWW string
}

func LoadConfig() (*Config, error) {
	env := os.Getenv("GO_ENV")
	if env == "" {
		env = "development"
	}

	// 도커 환경이 아닐 때만 파일에서 읽기 시도
	if os.Getenv("DOCKER_ENV") != "true" {
		viper.SetConfigName(".env")
		viper.SetConfigType("env")
		viper.AddConfigPath("../")
		viper.AddConfigPath(".")

		if err := viper.ReadInConfig(); err != nil {
			log.Printf(".env 파일을 읽을 수 없습니다: %v\n", err)
		}

		viper.SetConfigName(".env." + env)
		if err := viper.MergeInConfig(); err != nil {
			log.Printf("%s 환경별 .env 파일을 읽을 수 없습니다: %v\n", env, err)
		}
	}

	// 환경 변수 자동 읽기 활성화
	viper.AutomaticEnv()

	return &Config{
		Port:         viper.GetString("PORT"),
		DB_URL:       viper.GetString("DB_URL"),
		DB_NAME:      viper.GetString("DB_NAME"),
		Client_URL:   viper.GetString("CLIENT_URL"),
		ClientURLWWW: viper.GetString("CLIENT_URL_WWW"),
	}, nil
}
