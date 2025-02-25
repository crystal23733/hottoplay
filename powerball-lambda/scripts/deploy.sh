#!/bin/bash

# 이 스크립트는 파워볼 번호 생성기를 AWS Lambda에 배포합니다.

# 1. 환경 변수 파일 불러오기
if [ ! -f .env ]; then
  echo "❌ .env 파일이 없습니다!"
  echo "1. .env.example 파일을 복사해서 .env 파일을 만드세요."
  echo "2. .env 파일 안의 설정값들을 채워넣으세요."
  exit 1
fi

# .env 파일 불러오기
source .env

# 2. 필수 환경 변수 확인
if [ -z "$AWS_REGION" ] || [ -z "$LAMBDA_FUNCTION_NAME" ] || [ -z "$AWS_ACCOUNT_ID" ]; then
  echo "❌ 필수 환경 변수가 설정되지 않았습니다!"
  echo "AWS_REGION, LAMBDA_FUNCTION_NAME, AWS_ACCOUNT_ID를 확인해주세요."
  exit 1
fi

# 배포 전 확인
echo "다음 설정으로 배포를 진행합니다:"
echo "- 리전: $AWS_REGION"
echo "- 함수: $LAMBDA_FUNCTION_NAME"
echo "- API Gateway: $API_GATEWAY_ID"
read -p "계속 진행하시겠습니까? (y/N) " confirm
if [[ $confirm != [yY] ]]; then
  echo "배포가 취소되었습니다."
  exit 1
fi

echo "🚀 파워볼 번호 생성기를 배포합니다..."

# 3. Go 프로그램 빌드하기
echo "📦 프로그램을 빌드하고 있습니다..."
GOOS=linux GOARCH=amd64 go build -o bootstrap cmd/lambda/main.go

if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패!"
  exit 1
fi

# 4. ZIP 파일 만들기
echo "🤐 ZIP 파일을 만들고 있습니다..."
zip function.zip bootstrap

if [ $? -ne 0 ]; then
  echo "❌ ZIP 파일 생성 실패!"
  exit 1
fi

# 5. Lambda 함수 업데이트
echo "⚡️ Lambda 함수를 업데이트 하고 있습니다..."
aws lambda update-function-code \
  --function-name $LAMBDA_FUNCTION_NAME \
  --zip-file fileb://function.zip \
  --region $AWS_REGION

if [ $? -ne 0 ]; then
  echo "❌ Lambda 함수 업데이트 실패!"
  exit 1
fi

# Lambda 함수 설정 업데이트 (환경 변수가 있는 경우)
if [ ! -z "$S3_BUCKET_NAME" ] && [ ! -z "$S3_OBJECT_KEY" ]; then
  echo "⚙️ Lambda 함수 설정을 업데이트합니다..."
  aws lambda update-function-configuration \
    --function-name $LAMBDA_FUNCTION_NAME \
    --environment "Variables={S3_BUCKET_NAME=$S3_BUCKET_NAME,S3_OBJECT_KEY=$S3_OBJECT_KEY,CLIENT_URL=$CLIENT_URL,CLIENT_URL_WWW=$CLIENT_URL_WWW}" \
    --region $AWS_REGION
  
  if [ $? -ne 0 ]; then
    echo "❌ Lambda 함수 설정 업데이트 실패!"
    exit 1
  fi
fi

# 6. API Gateway 권한 설정 (API ID가 있는 경우에만)
if [ ! -z "$API_GATEWAY_ID" ]; then
  echo "🔑 API Gateway 설정을 진행합니다..."
  
  # /generate 리소스 설정
  # 1. 리소스 ID 가져오기
  GENERATE_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_GATEWAY_ID \
    --region $AWS_REGION \
    --query 'items[?path==`/generate`].id' \
    --output text)
    
  if [ -z "$GENERATE_RESOURCE_ID" ]; then
    echo "📝 /generate 리소스를 생성합니다..."
    GENERATE_RESOURCE_ID=$(aws apigateway create-resource \
      --rest-api-id $API_GATEWAY_ID \
      --parent-id $(aws apigateway get-resources \
        --rest-api-id $API_GATEWAY_ID \
        --query 'items[?path==`/`].id' \
        --output text) \
      --path-part "generate" \
      --region $AWS_REGION \
      --query 'id' \
      --output text)
    
    if [ $? -ne 0 ]; then
      echo "❌ 리소스 생성 실패!"
      exit 1
    fi
  fi

  # 2. POST 메서드 설정
  echo "📝 POST 메서드를 설정합니다..."
  aws apigateway put-method \
    --rest-api-id $API_GATEWAY_ID \
    --resource-id $GENERATE_RESOURCE_ID \
    --http-method POST \
    --authorization-type NONE \
    --region $AWS_REGION 2>/dev/null || true

  # 3. Lambda 통합 설정
  echo "🔗 Lambda 통합을 설정합니다..."
  aws apigateway put-integration \
    --rest-api-id $API_GATEWAY_ID \
    --resource-id $GENERATE_RESOURCE_ID \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT_ID}:function:${LAMBDA_FUNCTION_NAME}/invocations \
    --region $AWS_REGION

  if [ $? -ne 0 ]; then
    echo "❌ Lambda 통합 설정 실패!"
    exit 1
  fi

  # /statistics 리소스 설정
  echo "⚙️ /statistics 엔드포인트 설정..."
  STATISTICS_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_GATEWAY_ID \
    --region $AWS_REGION \
    --query 'items[?path==`/statistics`].id' \
    --output text)
    
  if [ -z "$STATISTICS_RESOURCE_ID" ]; then
    echo "📝 /statistics 리소스를 생성합니다..."
    STATISTICS_RESOURCE_ID=$(aws apigateway create-resource \
      --rest-api-id $API_GATEWAY_ID \
      --parent-id $(aws apigateway get-resources \
        --rest-api-id $API_GATEWAY_ID \
        --query 'items[?path==`/`].id' \
        --output text) \
      --path-part "statistics" \
      --region $AWS_REGION \
      --query 'id' \
      --output text)
    
    if [ $? -ne 0 ]; then
      echo "❌ 리소스 생성 실패!"
      exit 1
    fi
  fi

  # Statistics POST 메서드 설정
  echo "📝 Statistics POST 메서드를 설정합니다..."
  aws apigateway put-method \
    --rest-api-id $API_GATEWAY_ID \
    --resource-id $STATISTICS_RESOURCE_ID \
    --http-method POST \
    --authorization-type NONE \
    --region $AWS_REGION 2>/dev/null || true

  # Statistics Lambda 통합 설정
  echo "🔗 Statistics Lambda 통합을 설정합니다..."
  aws apigateway put-integration \
    --rest-api-id $API_GATEWAY_ID \
    --resource-id $STATISTICS_RESOURCE_ID \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri arn:aws:apigateway:${AWS_REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:${AWS_REGION}:${AWS_ACCOUNT_ID}:function:${LAMBDA_FUNCTION_NAME}/invocations \
    --region $AWS_REGION

  if [ $? -ne 0 ]; then
    echo "❌ Statistics Lambda 통합 설정 실패!"
    exit 1
  fi

  # 4. Lambda 권한 설정
  echo "🔑 Lambda 권한을 설정합니다..."
  aws lambda add-permission \
    --function-name $LAMBDA_FUNCTION_NAME \
    --statement-id apigateway-permission \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:${AWS_REGION}:${AWS_ACCOUNT_ID}:${API_GATEWAY_ID}/*" \
    --region $AWS_REGION \
    2>/dev/null || true

  # 5. API 배포
  echo "🚀 API를 배포합니다..."
  aws apigateway create-deployment \
    --rest-api-id $API_GATEWAY_ID \
    --stage-name prod \
    --region $AWS_REGION

  if [ $? -ne 0 ]; then
    echo "❌ API 배포 실패!"
    exit 1
  fi
fi

# 7. 임시 파일 정리
echo "🧹 임시 파일을 정리하고 있습니다..."
rm -f bootstrap function.zip

echo "🎉 배포가 완료되었습니다!"