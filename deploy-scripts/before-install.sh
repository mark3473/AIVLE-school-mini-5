#!/bin/bash
echo "===== BeforeInstall: cleanup ====="

# app 디렉토리 없으면 생성
mkdir -p /opt/app

# 기존 jar 제거
rm -f /opt/app/book-0.0.1-SNAPSHOT.jar
