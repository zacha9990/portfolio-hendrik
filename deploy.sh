#!/bin/bash
set -e

VPS_USER=root
VPS_HOST=103.178.153.134
DEPLOY_PATH=/opt/portfolio

echo "Deploying to $VPS_HOST..."

# Push latest code
git push origin main

# SSH into VPS and pull + restart
ssh $VPS_USER@$VPS_HOST << 'EOF'
  cd /opt/portfolio
  git pull origin main
  docker compose pull
  docker compose up -d --build
  docker compose ps
EOF

echo "Deploy complete. Site live at https://qz-hendrik.com"
