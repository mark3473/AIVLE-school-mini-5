#!/bin/bash
set -e

echo "===== BeforeInstall: cleanup ====="

mkdir -p /opt/app

# 🔥 모든 jar 제거 (권장)
rm -f /opt/app/*.jar
