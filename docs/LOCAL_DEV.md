# Local Development Guide

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js 20+](https://nodejs.org/) (check: `node -v`)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — for PostgreSQL

---

## One-time Setup

### 1. Clone repository

```bash
git clone https://github.com/zacha9990/portfolio-hendrik.git
cd portfolio-hendrik
```

### 2. Install dependencies

```bash
# Payload CMS
cd payload-cms
npm install --legacy-peer-deps
cd ..

# Next.js frontend
cd next-app
npm install
cd ..
```

### 3. Create environment files

**`payload-cms/.env`** (create this file manually):
```env
DATABASE_URI=postgresql://hendrik:localdev@localhost:5432/portfolio_local
PAYLOAD_SECRET=local-dev-secret-change-in-prod
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
PORT=3001
```

**`next-app/.env.local`** (create this file manually):
```env
NEXT_PUBLIC_PAYLOAD_API=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> These files are in `.gitignore` — tidak di-commit ke repo.

---

## Running Locally

Butuh **3 terminal** yang berjalan bersamaan.

### Terminal 1 — PostgreSQL (Docker)

```bash
cd portfolio-hendrik
docker compose -f docker-compose.dev.yml up -d
```

Cek status:
```bash
docker compose -f docker-compose.dev.yml ps
```

Stop PostgreSQL:
```bash
docker compose -f docker-compose.dev.yml down
```

### Terminal 2 — Payload CMS

```bash
cd payload-cms
npm run dev
```

- URL: http://localhost:3001
- Admin panel: http://localhost:3001/admin
- Hot reload aktif (ts-node-dev)

### Terminal 3 — Next.js Frontend

```bash
cd next-app
npm run dev
```

- URL: http://localhost:3000
- Hot reload aktif

---

## First-time Database Setup

Saat pertama kali menjalankan local, database kosong. Ada dua opsi:

### Opsi A — Buat data manual via admin panel

1. Buka http://localhost:3001/admin
2. Register admin account pertama
3. Input data via UI

### Opsi B — Seed dari script (data lengkap)

Jalankan seed script setelah membuat admin account:

```bash
# Dari root folder portfolio-hendrik
PAYLOAD_URL=http://localhost:3001 \
PAYLOAD_EMAIL=emailmu@example.com \
PAYLOAD_PASSWORD=passwordmu \
node scripts/seed.js
```

Script akan mengisi: Site Settings, 25 Skills, 5 Experience entries, 23 Projects.

---

## Development Workflow

```
edit kode → test di localhost:3000 → ok → minta deploy ke production
```

1. Buat perubahan di kode
2. Test di `http://localhost:3000`
3. Kalau sudah oke, minta approval untuk push & deploy ke server
4. Deploy di server: `https://qz-hendrik.com`

### Struktur folder

```
portfolio-hendrik/
├── docker-compose.dev.yml   # PostgreSQL untuk local dev
├── docker-compose.yml       # Production (VPS)
├── payload-cms/             # Payload CMS (port 3001 local)
│   ├── src/
│   │   ├── collections/     # Projects, Skills, Experience, dll
│   │   ├── globals/         # SiteSettings
│   │   └── server.ts
│   └── .env                 # LOCAL ONLY — jangan di-commit
├── next-app/                # Next.js frontend (port 3000 local)
│   ├── src/
│   │   ├── app/             # Pages (home, about, projects, contact)
│   │   ├── components/      # Reusable components
│   │   └── lib/payload.ts   # API helper functions
│   └── .env.local           # LOCAL ONLY — jangan di-commit
├── nginx/                   # Nginx config (production only)
├── scripts/
│   └── seed.js              # Database seed script
└── docs/                    # Dokumentasi
```

---

## Troubleshooting

### PostgreSQL gagal connect

Pastikan Docker Desktop berjalan, lalu cek container:
```bash
docker compose -f docker-compose.dev.yml ps
docker compose -f docker-compose.dev.yml logs postgres
```

### Port sudah dipakai

Ganti port di `.env` jika 3001 sudah dipakai:
```env
PORT=3002
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3002
```
Update juga `next-app/.env.local`:
```env
NEXT_PUBLIC_PAYLOAD_API=http://localhost:3002/api
```

### Payload tidak bisa connect ke DB

Pastikan PostgreSQL sudah jalan (Terminal 1) sebelum menjalankan `npm run dev` di payload-cms.

### Next.js menampilkan data kosong

Pastikan Payload CMS (Terminal 2) sudah ready sebelum membuka `localhost:3000`.

---

## Production

| Item | Value |
|------|-------|
| Domain | https://qz-hendrik.com |
| CMS Admin | https://qz-hendrik.com:8443/admin |
| VPS IP | 103.178.153.134 |
| Deploy | Lihat [DEPLOY.md](DEPLOY.md) |
