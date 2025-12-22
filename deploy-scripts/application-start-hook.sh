#!/bin/bash
set -e

echo "===== CodeDeploy ApplicationStart ====="

####################################
# 1. Backend (Spring Boot) restart
####################################
echo "Stopping existing Spring Boot app..."

# 실행 중인 기존 jar 종료 (없어도 에러 안 나게)
pkill -f 'java.*\.jar' || true
sleep 2

echo "Starting new Spring Boot app..."

# 가장 최신 jar 찾기
JAR_FILE=$(ls -t /opt/app/*.jar | head -n 1)

echo "Using JAR: $JAR_FILE"

nohup java -jar "$JAR_FILE" \
  > /opt/app/app.log 2>&1 &

####################################
# 2. Frontend (nginx) reload
####################################
echo "Reloading nginx..."
systemctl reload nginx

echo "===== ApplicationStart completed ====="
