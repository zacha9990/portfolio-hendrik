# Quick Reference — Claude Code Cheatsheet

## How to Use These Files
Taruh semua file `.md` ini di root project kamu. Lalu beri command ke Claude Code:
**"Baca CLAUDE_CODE_REFERENCE.md dan PHASE_N.md, lalu kerjakan Phase N"**

---

## File Index

| File | Isi |
|---|---|
| `PLANNING.md` | Gambaran besar: tech stack, domain, design system, arsitektur |
| `PHASE_0.md` | **Local dev setup** — Docker dev environment + hot reload |
| `PHASE_1.md` | VPS setup — Docker, Nginx, SSL wildcard |
| `PHASE_2.md` | Payload CMS — scaffold + semua collections |
| `PHASE_3.md` | Data konten lengkap dari CV (23 proyek, experience, skills) |
| `PHASE_4.md` | Next.js frontend — semua halaman dan komponen |
| `PHASE_5.md` | Deploy demo apps per subdomain |
| `PHASE_6.md` | Final QA, SEO, security hardening, go live |
| `DEPLOY.md` | **Deployment workflow** — deploy script, rollback, shortcuts |

---

## Recommended Order

```
PHASE_0  →  PHASE_2  →  PHASE_3  →  PHASE_4  →  PHASE_1  →  PHASE_5  →  PHASE_6
(local)     (CMS)       (content)   (frontend)  (VPS)       (demos)     (go live)
```

> Code locally first (Phase 0 → 4), then set up VPS and deploy (Phase 1 → DEPLOY).

---

## Key Decisions

| Decision | Choice |
|---|---|
| Frontend | Next.js 14 (App Router) |
| CMS | Payload CMS 2.x |
| Database | PostgreSQL 16 |
| Proxy | Nginx |
| Containers | Docker + Docker Compose |
| SSL | Let's Encrypt wildcard |
| Design | Dark mode minimalist |
| Local dev | Docker Compose dengan dev override + hot reload |
| Deployment | deploy.sh — git push → SSH → docker compose build & up |

---

## Local Dev URLs

| Service | URL |
|---|---|
| Portfolio | http://localhost:3000 |
| Payload CMS | http://localhost:3001/admin |
| Payload API | http://localhost:3001/api |
| PostgreSQL | localhost:5432 |

---

## Production Domain Structure
*(replace `yourdomain.com` dengan domain asli)*

| URL | Service |
|---|---|
| `yourdomain.com` | Next.js :3000 |
| `cms.yourdomain.com` | Payload CMS :3001 |
| `rumahtap.yourdomain.com` | Demo :3002 |
| `blockassign.yourdomain.com` | Demo :3003 |

---

## Port Map

| Port | Service |
|---|---|
| 80/443 | Nginx (production only) |
| 3000 | Next.js |
| 3001 | Payload CMS |
| 3002 | Demo: RumahTAP |
| 3003 | Demo: BlockAssignment |
| 5432 | PostgreSQL |

---

## Day-to-Day Dev Workflow

```bash
make dev          # Start local dev (hot reload)
# ... code & test di localhost:3000 ...
git add . && git commit -m "..."
git push origin main
make deploy       # SSH ke VPS, pull, rebuild, restart
```

---

## Owner Info

```
Name:     Zacharias Hendrik
Email:    qzacharias.hendrik@gmail.com
Phone:    +62 896-7425-2886
LinkedIn: linkedin.com/in/zacharias-hendrik-27a002145
Location: Tangerang, Indonesia
Title:    Backend Engineer
Years:    7+
```

---

## CMS Collections Summary

| Collection | Purpose |
|---|---|
| `projects` | 23 portfolio projects |
| `demos` | Live demo app registry |
| `experience` | Work history timeline |
| `skills` | Skill badges by category |
| `contact-submissions` | Contact form inbox |
| `media` | Images & file uploads |
| `users` | CMS admin accounts |
| `site-settings` (global) | Tagline, availability status, social links |

---

## Important Notes for Claude Code

1. **Replace `yourdomain.com` dan `YOUR_VPS_IP`** sebelum menulis config file apapun.
2. **Gunakan `docker-compose.dev.yml` override untuk local** — jangan jalankan `docker-compose.yml` production sendirian di local.
3. **Jangan commit `.env`** — hanya `.env.example` yang masuk git.
4. **Phase 3 data entry** — bisa via CMS admin UI atau Claude Code bisa tulis seed script.
5. **Phase 5 (demo apps)** — butuh source code asli RumahTAP, BlockAssignment, dll untuk di-dockerize.
6. **SSL harus di-issue sebelum HTTPS Nginx config aktif** — Phase 1 mengatur urutannya.
7. **Semua port di production** harus bound ke `127.0.0.1` di docker-compose — Nginx yang handle semua external traffic.
