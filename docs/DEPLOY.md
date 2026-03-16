# Deploy — Deployment Workflow

## Strategy
- **Source of truth:** GitHub repository
- **Trigger:** Manual — run `make deploy` or `bash deploy.sh` from local machine
- **Process:** Local machine SSHs into VPS, pulls latest code, rebuilds and restarts containers
- **No CI/CD server needed** — simple and reliable for a solo project

---

## How It Works

```
Your Local Machine
      │
      │  git push origin main
      ▼
   GitHub
      │
      │  deploy.sh: SSH into VPS
      ▼
     VPS
      ├── git pull origin main
      ├── docker compose build (only changed services)
      ├── docker compose up -d
      └── docker system prune -f (cleanup old images)
```

---

## Step 1 — SSH Key Setup (One Time)

Make sure your local SSH key is authorized on the VPS:

```bash
# On your local machine — generate key if you don't have one
ssh-keygen -t ed25519 -C "hendrik-deploy"

# Copy public key to VPS
ssh-copy-id root@YOUR_VPS_IP

# Test
ssh root@YOUR_VPS_IP "echo connected"
```

---

## Step 2 — deploy.sh

Create `deploy.sh` at repo root:

```bash
#!/bin/bash
set -e

# ---- Config ----
VPS_USER="root"
VPS_IP="YOUR_VPS_IP"
VPS_DIR="/opt/hendrik-portfolio"
BRANCH="main"

# ---- Colors ----
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}🚀 Starting deployment to ${VPS_IP}...${NC}"

# ---- Deploy ----
ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_IP} << EOF
  set -e
  echo "📂 Navigating to project directory..."
  cd ${VPS_DIR}

  echo "🔄 Pulling latest code from ${BRANCH}..."
  git pull origin ${BRANCH}

  echo "🔨 Building updated containers..."
  docker compose build

  echo "🔁 Restarting services..."
  docker compose up -d

  echo "🧹 Cleaning up unused images..."
  docker system prune -f

  echo "✅ Services status:"
  docker compose ps
EOF

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Live at: https://$(grep DOMAIN ${VPS_DIR}/.env | cut -d= -f2)${NC}"
```

Make it executable:

```bash
chmod +x deploy.sh
```

---

## Step 3 — First-Time VPS Git Setup

Before first deploy, SSH into VPS and clone the repo:

```bash
ssh root@YOUR_VPS_IP

cd /opt
git clone https://github.com/yourusername/hendrik-portfolio.git hendrik-portfolio
cd hendrik-portfolio

# Create production .env (NOT committed to git)
cp .env.example .env
nano .env   # Fill in production values
```

Production `.env` values (on VPS):

```env
DOMAIN=yourdomain.com

POSTGRES_USER=hendrik
POSTGRES_PASSWORD=STRONG_PRODUCTION_PASSWORD
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://hendrik:STRONG_PRODUCTION_PASSWORD@postgres:5432/portfolio_db

PAYLOAD_SECRET=RANDOM_32_CHAR_STRING_FOR_PRODUCTION
PAYLOAD_PUBLIC_SERVER_URL=https://cms.yourdomain.com

NEXT_PUBLIC_PAYLOAD_API=https://cms.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Step 4 — Selective Rebuild (Faster Deploys)

If you only changed the frontend, no need to rebuild CMS:

```bash
# Only rebuild and restart Next.js
ssh root@YOUR_VPS_IP "cd /opt/hendrik-portfolio && git pull && docker compose build next-app && docker compose up -d next-app"
```

Add shortcuts to Makefile:

```makefile
# Deploy everything
deploy:
	bash deploy.sh

# Deploy only frontend
deploy-frontend:
	ssh root@YOUR_VPS_IP "cd /opt/hendrik-portfolio && git pull origin main && docker compose build next-app && docker compose up -d next-app"

# Deploy only CMS
deploy-cms:
	ssh root@YOUR_VPS_IP "cd /opt/hendrik-portfolio && git pull origin main && docker compose build payload-cms && docker compose up -d payload-cms"
```

---

## Step 5 — Rollback

If something goes wrong after deploy:

```bash
ssh root@YOUR_VPS_IP

cd /opt/hendrik-portfolio

# See recent commits
git log --oneline -10

# Roll back to previous commit
git checkout <previous-commit-hash>

# Rebuild and restart
docker compose build && docker compose up -d
```

---

## Day-to-Day Workflow Summary

```bash
# 1. Start local dev
make dev

# 2. Write code, test at localhost:3000

# 3. Commit
git add .
git commit -m "feat: add project filter animation"
git push origin main

# 4. Deploy to production
make deploy

# Done ✅
```

---

## Environment Variables Summary

| File | Where | Committed? |
|---|---|---|
| `.env.example` | Root | ✅ Yes — template only |
| `.env` | Root (local) | ❌ No — local secrets |
| `.env.production` | VPS only | ❌ No — created manually on VPS |

---

## Useful SSH Commands for VPS Maintenance

```bash
# Check all containers
ssh root@VPS_IP "docker compose -f /opt/hendrik-portfolio/docker-compose.yml ps"

# View live logs
ssh root@VPS_IP "docker compose -f /opt/hendrik-portfolio/docker-compose.yml logs -f"

# Restart a specific service
ssh root@VPS_IP "docker compose -f /opt/hendrik-portfolio/docker-compose.yml restart next-app"

# Check disk usage
ssh root@VPS_IP "df -h"

# Check memory
ssh root@VPS_IP "free -h"
```
