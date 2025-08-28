#!/bin/bash

# 이 스크립트는 로또 번호 생성기를 AWS Lambda에 배포합니다.

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. 환경 변수 파일 불러오기
if [ ! -f .env ]; then
  echo -e "${RED}❌ .env 파일이 없습니다!${NC}"
  echo "1. .env.example 파일을 복사해서 .env 파일을 만드세요."
  echo "2. .env 파일 안의 설정값들을 채워넣으세요."
  exit 1
fi

# .env 파일 불러오기
source .env

# 2. 필수 환경 변수 확인
if [ -z "$AWS_REGION" ] || [ -z "$LAMBDA_FUNCTION_NAME" ] || [ -z "$AWS_ACCOUNT_ID" ]; then
  echo -e "${RED}❌ 필수 환경 변수가 설정되지 않았습니다!${NC}"
  echo "AWS_REGION, LAMBDA_FUNCTION_NAME, AWS_ACCOUNT_ID를 확인해주세요."
  exit 1
fi

# 배포 전 확인
echo -e "${BLUE}다음 설정으로 배포를 진행합니다:${NC}"
echo "- 리전: $AWS_REGION"
echo "- 함수: $LAMBDA_FUNCTION_NAME"
read -p "계속 진행하시겠습니까? (y/N) " confirm
if [[ $confirm != [yY] ]]; then
  echo "배포가 취소되었습니다."
  exit 1
fi

echo -e "${GREEN}🚀 로또 번호 생성기를 배포합니다...${NC}"

# 3. Go 프로그램 빌드하기
echo -e "${YELLOW}📦 프로그램을 빌드하고 있습니다...${NC}"
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o bootstrap cmd/main.go

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ 빌드 실패!${NC}"
  exit 1
fi

# 4. ZIP 파일 만들기
echo -e "${YELLOW}🤐 ZIP 파일을 만들고 있습니다...${NC}"
zip -j lotto-lambda.zip bootstrap

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ ZIP 파일 생성 실패!${NC}"
  exit 1
fi

# 5. Lambda 함수가 존재하는지 확인
echo -e "${YELLOW}🔍 Lambda 함수 존재 여부 확인...${NC}"
aws lambda get-function --function-name $LAMBDA_FUNCTION_NAME --region $AWS_REGION > /dev/null 2>&1

if [ $? -eq 0 ]; then
  # 함수가 존재하면 업데이트
  echo -e "${YELLOW}⚡️ Lambda 함수를 업데이트 하고 있습니다...${NC}"
  aws lambda update-function-code \
    --function-name $LAMBDA_FUNCTION_NAME \
    --zip-file fileb://lotto-lambda.zip \
    --region $AWS_REGION

  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Lambda 함수 업데이트 실패!${NC}"
    exit 1
  fi
else
  # 함수가 없으면 새로 생성
  echo -e "${YELLOW}🆕 새로운 Lambda 함수를 생성합니다...${NC}"
  
  # IAM 역할 ARN 생성
  ROLE_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:role/lambda-execution-role"
  
  aws lambda create-function \
    --function-name $LAMBDA_FUNCTION_NAME \
    --runtime provided.al2 \
    --role $ROLE_ARN \
    --handler bootstrap \
    --zip-file fileb://lotto-lambda.zip \
    --timeout 30 \
    --memory-size 256 \
    --region $AWS_REGION

  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Lambda 함수 생성 실패!${NC}"
    echo "IAM 역할이 존재하는지 확인해주세요: $ROLE_ARN"
    exit 1
  fi
fi

# 6. Lambda 함수 설정 업데이트 (환경 변수)
echo -e "${YELLOW}⚙️ Lambda 함수 환경 변수를 설정합니다...${NC}"
aws lambda update-function-configuration \
  --function-name $LAMBDA_FUNCTION_NAME \
  --environment "Variables={S3_BUCKET=$S3_BUCKET,S3_REGION=$S3_REGION,S3_PREFIX=$S3_PREFIX,API_KEY=$API_KEY,CLIENT_URL=$CLIENT_URL,CLIENT_URL_WWW=$CLIENT_URL_WWW}" \
  --region $AWS_REGION

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Lambda 함수 환경 변수 설정 실패!${NC}"
  exit 1
fi

# 7. 정리
echo -e "${YELLOW}🧹 임시 파일을 정리합니다...${NC}"
rm -f bootstrap lotto-lambda.zip

echo ""
echo -e "${GREEN}🎉 배포가 완료되었습니다!${NC}"
echo ""
echo -e "${BLUE}테스트 방법:${NC}"
echo "1. 헬스체크:"
echo "   aws lambda invoke --function-name $LAMBDA_FUNCTION_NAME response.json --region $AWS_REGION"
echo ""
echo "2. 함수 호출 테스트:"
echo "   aws lambda invoke --function-name $LAMBDA_FUNCTION_NAME --payload '{\"httpMethod\":\"GET\",\"path\":\"/api/v1/lotto\"}' response.json --region $AWS_REGION"
echo ""