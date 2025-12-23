#!/bin/bash
set -e

echo "===== CodeDeploy ApplicationStart ====="

####################################
# 1. Backend (Spring Boot) restart
####################################
echo "Stopping existing Spring Boot app..."

# 실행 중인 기존 Spring Boot 종료
pkill -f 'java.*\.jar' || true
sleep 2

echo "Starting new Spring Boot app..."

# 🚨 plain.jar 제외하고 실행용 jar만 선택
JAR_FILE=$(ls -t /opt/app/*.jar | grep -v plain | head -n 1)

if [ -z "$JAR_FILE" ]; then
  echo "❌ Executable JAR not found"
  exit 1
fi

echo "Using JAR: $JAR_FILE"

nohup java -jar "$JAR_FILE" \
  > /opt/app/app.log 2>&1 &

####################################
# 2. Frontend (nginx) reload
####################################
echo "Reloading nginx..."
systemctl reload nginx

echo "===== ApplicationStart completed ====="
