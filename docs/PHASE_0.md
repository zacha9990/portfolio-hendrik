# Phase 0 — Local Development Setup

## Goal
Set up a local development environment that mirrors production as closely as possible, with hot reload for fast iteration. Uses Docker Compose with a dev override so you don't need to install PHP, Node.js, or PostgreSQL directly on your machine.

---

## Prerequisites (Install on Your Local Machine)

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
- [Git](https://git-scm.com/)
- [Claude Code](https://claude.ai/code) (CLI)
- A code editor (VS Code recommended)
- Node.js 20+ (only needed to run `npm install` locally for editor intellisense — not for running the app)

---

## Step 1 — Repository Structure

Create a GitHub repository and clone it locally:

```bash
git clone https://github.com/yourusername/hendrik-portfolio.git
cd hendrik-portfolio
```

Final repo structure:

```
hendrik-portfolio/
├── docker-compose.yml          # Production config
├── docker-compose.dev.yml      # Local dev overrides
├── .env.example                # Template (commit this)
├── .env                        # Local secrets (DO NOT commit)
├── .env.production             # VPS secrets (DO NOT commit)
├── .gitignore
├── deploy.sh                   # One-command deploy script
├── nginx/
│   ├── nginx.conf
│   └── conf.d/
├── next-app/                   # Next.js source
├── payload-cms/                # Payload CMS source
└── demos/
    ├── rumahtap/
    └── blockassign/
```

---

## Step 2 — .gitignore

Create `.gitignore` at repo root:

```gitignore
# Environment files
.env
.env.production
.env.local

# Node
node_modules/
.next/
dist/

# Docker volumes
postgres_data/

# Payload media uploads
payload-cms/media/

# Logs
*.log

# OS
.DS_Store
Thumbs.db
```

---

## Step 3 — .env.example (commit this)

```env
# Domain
DOMAIN=yourdomain.com

# PostgreSQL
POSTGRES_USER=hendrik
POSTGRES_PASSWORD=your_password_here
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://hendrik:your_password_here@postgres:5432/portfolio_db

# Payload CMS
PAYLOAD_SECRET=your_random_32_char_secret
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001

# Next.js
NEXT_PUBLIC_PAYLOAD_API=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 4 — Local .env

Copy and fill in with local values:

```bash
cp .env.example .env
```

Edit `.env` for local:

```env
DOMAIN=localhost

POSTGRES_USER=hendrik
POSTGRES_PASSWORD=localdevpassword
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://hendrik:localdevpassword@postgres:5432/portfolio_db

PAYLOAD_SECRET=localdevsecret32charslongxxxxxxxx
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001

NEXT_PUBLIC_PAYLOAD_API=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 5 — docker-compose.dev.yml

This overrides the production `docker-compose.yml` for local development with:
- Volume mounts for hot reload (no rebuild needed on code change)
- Ports exposed directly to localhost
- No SSL / Nginx needed locally

Create `docker-compose.dev.yml` at repo root:

```yaml
services:
  postgres:
    ports:
      - "5432:5432"   # Expose locally for DB tools (TablePlus, DBeaver, etc.)

  payload-cms:
    build:
      context: ./payload-cms
      target: dev            # Use dev stage in Dockerfile
    volumes:
      - ./payload-cms/src:/app/src   # Hot reload
      - ./payload-cms/media:/app/media
    environment:
      PAYLOAD_PUBLIC_SERVER_URL: http://localhost:3001
      DATABASE_URI: ${DATABASE_URL}
      PAYLOAD_SECRET: ${PAYLOAD_SECRET}
    ports:
      - "3001:3000"
    command: npm run dev     # Use dev server, not built output

  next-app:
    build:
      context: ./next-app
      target: dev            # Use dev stage in Dockerfile
    volumes:
      - ./next-app/src:/app/src     # Hot reload
      - ./next-app/public:/app/public
    environment:
      NEXT_PUBLIC_PAYLOAD_API: http://localhost:3001/api
      NEXT_PUBLIC_SITE_URL: http://localhost:3000
    ports:
      - "3000:3000"
    command: npm run dev

  # No nginx in local dev — access services directly on their ports
  nginx:
    profiles: ["production"]   # Disable nginx in local dev
```

---

## Step 6 — Update Dockerfiles for Dev Stage

### `payload-cms/Dockerfile`

```dockerfile
# ---- Dev stage ----
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install          # Install all deps including devDependencies
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Production stage ----
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### `next-app/Dockerfile`

```dockerfile
# ---- Dev stage ----
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- Production build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production runner ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Step 7 — Running Locally

```bash
# Start all dev services (with hot reload)
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Or in background
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

# Stop all
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

**Tip:** Add a Makefile to shorten these commands:

```makefile
# Makefile
dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up

dev-bg:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

logs:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

prod-build:
	docker compose build

deploy:
	bash deploy.sh
```

Then just run:
```bash
make dev       # Start local dev
make down      # Stop
make deploy    # Deploy to VPS
```

---

## Step 8 — Local URLs

| Service | Local URL |
|---|---|
| Portfolio (Next.js) | http://localhost:3000 |
| Payload CMS Admin | http://localhost:3001/admin |
| Payload API | http://localhost:3001/api |
| PostgreSQL | localhost:5432 |

---

## Development Workflow

```
1. Code changes in ./next-app/src or ./payload-cms/src
        ↓
2. Hot reload triggers automatically (no rebuild needed)
        ↓
3. Test at localhost:3000 / localhost:3001
        ↓
4. git add . && git commit -m "your message"
        ↓
5. git push origin main
        ↓
6. make deploy  (or bash deploy.sh)
        ↓
7. Live at yourdomain.com ✅
```

---

## Verification Checklist

- [ ] Docker Desktop running
- [ ] `make dev` starts all services without errors
- [ ] http://localhost:3000 shows Next.js app
- [ ] http://localhost:3001/admin shows Payload CMS
- [ ] Code change in Next.js reflects in browser without restarting container
- [ ] Code change in Payload CMS reflects without restarting container
- [ ] PostgreSQL accessible on port 5432 (test with TablePlus/DBeaver)

---

## Next Phase
➡️ Proceed to `PHASE_1.md` — VPS Setup (run this when ready to deploy)
