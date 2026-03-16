# Phase 1 — VPS Setup, Docker, Nginx, SSL

## Goal
Prepare the VPS infrastructure so all services (Next.js, Payload CMS, demo apps) can run as Docker containers behind an Nginx reverse proxy with wildcard SSL.

---

## Prerequisites (Manual Steps Before Running Phase 1)

1. Provision a VPS (Ubuntu 24.04 LTS recommended, min 2 vCPU / 4GB RAM)
2. Point domain DNS to VPS IP:
   - `A record`: `yourdomain.com` → VPS IP
   - `A record`: `*.yourdomain.com` → VPS IP (wildcard, covers all subdomains)
3. SSH into VPS as root or sudo user

---

## Directory Structure to Create on VPS

```
/opt/hendrik-portfolio/
├── docker-compose.yml
├── .env
├── nginx/
│   ├── nginx.conf
│   └── conf.d/
│       ├── portfolio.conf
│       ├── cms.conf
│       ├── demo-rumahtap.conf
│       └── demo-blockassign.conf
├── certbot/
│   ├── www/
│   └── conf/
├── next-app/           (Next.js source, built into image)
├── payload-cms/        (Payload CMS source, built into image)
└── demos/
    ├── rumahtap/
    └── blockassign/
```

---

## Step 1 — Install Dependencies on VPS

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER

# Install Docker Compose plugin
apt install docker-compose-plugin -y

# Install Certbot + Nginx plugin
apt install certbot python3-certbot-nginx -y

# Verify
docker --version
docker compose version
certbot --version
```

---

## Step 2 — Project Directory

```bash
mkdir -p /opt/hendrik-portfolio/{nginx/conf.d,certbot/www,certbot/conf,demos}
cd /opt/hendrik-portfolio
```

---

## Step 3 — .env File

Create `/opt/hendrik-portfolio/.env`:

```env
# Domain
DOMAIN=yourdomain.com

# PostgreSQL
POSTGRES_USER=hendrik
POSTGRES_PASSWORD=CHANGE_THIS_STRONG_PASSWORD
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://hendrik:CHANGE_THIS_STRONG_PASSWORD@postgres:5432/portfolio_db

# Payload CMS
PAYLOAD_SECRET=CHANGE_THIS_RANDOM_32_CHAR_STRING
PAYLOAD_PUBLIC_SERVER_URL=https://cms.yourdomain.com

# Next.js
NEXT_PUBLIC_PAYLOAD_API=https://cms.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Step 4 — Docker Compose

Create `/opt/hendrik-portfolio/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: portfolio_postgres
    restart: unless-stopped
    env_file: .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - internal

  payload-cms:
    build: ./payload-cms
    container_name: portfolio_cms
    restart: unless-stopped
    env_file: .env
    environment:
      DATABASE_URI: ${DATABASE_URL}
      PAYLOAD_SECRET: ${PAYLOAD_SECRET}
      PAYLOAD_PUBLIC_SERVER_URL: ${PAYLOAD_PUBLIC_SERVER_URL}
    ports:
      - "3001:3000"
    depends_on:
      - postgres
    networks:
      - internal
      - web

  next-app:
    build: ./next-app
    container_name: portfolio_next
    restart: unless-stopped
    env_file: .env
    environment:
      NEXT_PUBLIC_PAYLOAD_API: ${NEXT_PUBLIC_PAYLOAD_API}
      NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL}
    ports:
      - "3000:3000"
    depends_on:
      - payload-cms
    networks:
      - web

  nginx:
    image: nginx:alpine
    container_name: portfolio_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/www:/var/www/certbot:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    depends_on:
      - next-app
      - payload-cms
    networks:
      - web

volumes:
  postgres_data:

networks:
  internal:
  web:
```

---

## Step 5 — Nginx Configuration

### `/opt/hendrik-portfolio/nginx/nginx.conf`

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  sendfile on;
  keepalive_timeout 65;
  client_max_body_size 50M;
  include /etc/nginx/conf.d/*.conf;
}
```

### Static configs (Portfolio + CMS)

Only these two are written manually. All demo subdomains are generated dynamically via script (see `PHASE_5.md`).

### `/opt/hendrik-portfolio/nginx/conf.d/portfolio.conf`

```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;

  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    return 301 https://yourdomain.com$request_uri;
  }
}

server {
  listen 443 ssl;
  server_name yourdomain.com www.yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  location / {
    proxy_pass http://next-app:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### `/opt/hendrik-portfolio/nginx/conf.d/cms.conf`

```nginx
server {
  listen 80;
  server_name cms.yourdomain.com;

  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location / {
    return 301 https://cms.yourdomain.com$request_uri;
  }
}

server {
  listen 443 ssl;
  server_name cms.yourdomain.com;

  ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

  location / {
    proxy_pass http://payload-cms:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

> ⚠️ Demo subdomain configs (e.g. `rumahtap.yourdomain.com`) are NOT written here manually.
> They are auto-generated from CMS data. See `PHASE_5.md` → nginx-sync script.

---

## Step 6 — Issue Wildcard SSL Certificate

```bash
# Issue wildcard cert (covers yourdomain.com and *.yourdomain.com)
# Use DNS challenge — Certbot will ask you to add a TXT record to your DNS
certbot certonly \
  --manual \
  --preferred-challenges dns \
  -d yourdomain.com \
  -d "*.yourdomain.com"

# Follow the prompts — add the TXT record in your DNS provider
# Then verify and complete
```

---

## Step 7 — First Boot

```bash
cd /opt/hendrik-portfolio

# Start only Nginx first to verify config
docker compose up nginx -d

# Start all services
docker compose up -d

# Check status
docker compose ps
docker compose logs -f
```

---

## Step 8 — Auto-Renew SSL

```bash
# Add to crontab (root)
crontab -e

# Add this line:
0 3 * * * certbot renew --quiet && docker compose -f /opt/hendrik-portfolio/docker-compose.yml restart nginx
```

---

## Verification Checklist

- [ ] VPS reachable via SSH
- [ ] DNS A record and wildcard A record pointing to VPS IP
- [ ] Docker and Docker Compose installed
- [ ] `.env` file filled with real values
- [ ] Wildcard SSL certificate issued
- [ ] All containers running (`docker compose ps`)
- [ ] `https://yourdomain.com` loads (Next.js placeholder)
- [ ] `https://cms.yourdomain.com` loads (Payload CMS)
- [ ] No SSL warnings in browser

---

## Next Phase
➡️ Proceed to `PHASE_2.md` — Payload CMS setup and collections
