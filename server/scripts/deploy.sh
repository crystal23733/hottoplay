#!/bin/bash

# 이 스크립트는 로또 번호 생성기를 AWS Lambda에 배포하고 API Gateway를 자동 설정합니다.

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
echo "- API Gateway: $API_GATEWAY_ID"
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

# 7. API Gateway 설정 (API ID가 있는 경우에만)
if [ ! -z "$API_GATEWAY_ID" ]; then
  echo -e "${YELLOW}🔑 API Gateway 설정을 진행합니다...${NC}"
  
  # Root 리소스 ID 가져오기
  ROOT_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_GATEWAY_ID \
    --region $AWS_REGION \
    --query 'items[?path==`/`].id' \
    --output text)

  # /api 리소스 생성 또는 가져오기
  API_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_GATEWAY_ID \
    --region $AWS_REGION \
    --query 'items[?path==`/api`].id' \
    --output text)

  if [ -z "$API_RESOURCE_ID" ] || [ "$API_RESOURCE_ID" == "None" ]; then
    echo -e "${YELLOW}📝 /api 리소스를 생성합니다...${NC}"
    API_RESOURCE_ID=$(aws apigateway create-resource \
      --rest-api-id $API_GATEWAY_ID \
      --parent-id $ROOT_RESOURCE_ID \
      --path-part "api" \
      --region $AWS_REGION \
      --query 'id' \
      --output text)
  fi

  # /api/v1 리소스 생성 또는 가져오기
  V1_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_GATEWAY_ID \
    --region $AWS_REGION \
    --query 'items[?path==`/api/v1`].id' \
    --output text)

  if [ -z "$V1_RESOURCE_ID" ] || [ "$V1_RESOURCE_ID" == "None" ]; then
    echo -e "${YELLOW}📝 /api/v1 리소스를 생성합니다...${NC}"
    V1_RESOURCE_ID=$(aws apigateway create-resource \
      --rest-api-id $API_GATEWAY_ID \
      --parent-id $API_RESOURCE_ID \
      --path-part "v1" \
      --region $AWS_REGION \
      --query 'id' \
      --output text)
  fi

  # 프록시 리소스 설정 ({proxy+})
  PROXY_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_GATEWAY_ID \
    --region $AWS_REGION \
    --query 'items[?path==`/api/v1/{proxy+}`].id' \
    --output text)

  if [ -z "$PROXY_RESOURCE_ID" ] || [ "$PROXY_RESOURCE_ID" == "None" ]; then
    echo -e "${YELLOW}📝 프록시 리소스를 생성합니다...${NC}"
    PROXY_RESOURCE_ID=$(aws apigateway create-resource \
      --rest-api-id $API_GATEWAY_ID \
      --parent-id $V1_RESOURCE_ID \
      --path-part "{proxy+}" \
      --region $AWS_REGION \
      --query 'id' \
      --output text)
  fi

  # ANY 메서드 설정
  echo -e "${YELLOW}📝 ANY 메서드를 설정합니다...${NC}"
  aws apigateway put-method \
    --rest-api-id $API_GATEWAY_ID \
    --resource-id $PROXY_RESOURCE_ID \
    --http-method ANY \
    --authorization-type NONE \
    --region $AWS_REGION \
    --request-parameters "{\"method.request.path.proxy\": true}" 2>/dev/null || true

  # Lambda 통합 설정
  echo -e "${YELLOW}🔗 Lambda 통합을 설정합니다...${NC}"
  LAMBDA_URI="arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT_ID}:function:${LAMBDA_FUNCTION_NAME}/invocations"
  
  aws apigateway put-integration \
    --rest-api-id $API_GATEWAY_ID \
    --resource-id $PROXY_RESOURCE_ID \
    --http-method ANY \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri $LAMBDA_URI \
    --region $AWS_REGION 2>/dev/null || true

  # Lambda 권한 추가
  echo -e "${YELLOW}🔐 Lambda 실행 권한을 추가합니다...${NC}"
  aws lambda add-permission \
    --function-name $LAMBDA_FUNCTION_NAME \
    --statement-id apigateway-invoke \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:${AWS_REGION}:${AWS_ACCOUNT_ID}:${API_GATEWAY_ID}/*/*/*" \
    --region $AWS_REGION 2>/dev/null || true

  # 배포
  echo -e "${YELLOW}🚀 API Gateway를 배포합니다...${NC}"
  aws apigateway create-deployment \
    --rest-api-id $API_GATEWAY_ID \
    --stage-name prod \
    --region $AWS_REGION

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ API Gateway 배포 완료!${NC}"
    echo -e "${BLUE}API 엔드포인트: https://${API_GATEWAY_ID}.execute-api.${AWS_REGION}.amazonaws.com/prod/api/v1/lotto${NC}"
  fi
else
  echo -e "${BLUE}💡 API Gateway를 새로 생성하려면 다음 명령어를 실행하세요:${NC}"
  echo "aws apigateway create-rest-api --name 'lotto-api' --region $AWS_REGION"
  echo "그 후 API_GATEWAY_ID를 .env 파일에 추가하고 다시 배포하세요."
fi

# 8. 정리
echo -e "${YELLOW}🧹 임시 파일을 정리합니다...${NC}"
rm -f bootstrap lotto-lambda.zip

echo ""
echo -e "${GREEN}🎉 배포가 완료되었습니다!${NC}"
echo ""
echo -e "${BLUE}테스트 방법:${NC}"
echo "1. 헬스체크:"
if [ ! -z "$API_GATEWAY_ID" ]; then
  echo "   curl https://${API_GATEWAY_ID}.execute-api.${AWS_REGION}.amazonaws.com/prod/api/v1/lotto"
else
  echo "   aws lambda invoke --function-name $LAMBDA_FUNCTION_NAME response.json --region $AWS_REGION"
fi
echo ""
echo "2. 번호 생성:"
if [ ! -z "$API_GATEWAY_ID" ]; then
  echo "   curl -X POST \\"
  echo "     -H \"Content-Type: application/json\" \\"
  echo "     -H \"X-API-Key: \$API_KEY\" \\"
  echo "     -d '{\"type\": \"unique\"}' \\"
  echo "     https://${API_GATEWAY_ID}.execute-api.${AWS_REGION}.amazonaws.com/prod/api/v1/lotto/numbers"
fi
echo ""
