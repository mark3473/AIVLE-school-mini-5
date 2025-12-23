#!/bin/bash
set -e

echo "===== CodeDeploy ApplicationStart ====="

echo "Stopping existing Spring Boot app..."
pkill -f 'java.*book-0.0.1-SNAPSHOT.jar' || true
sleep 2

echo "Starting Spring Boot app..."

nohup java -jar /opt/app/book-0.0.1-SNAPSHOT.jar \
  > /opt/app/app.log 2>&1 &

echo "Reloading nginx..."
systemctl reload nginx

echo "===== ApplicationStart completed ====="
