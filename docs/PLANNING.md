# Zacharias Hendrik — Portfolio Website Planning

## Owner
- **Name:** Zacharias Hendrik
- **Email:** qzacharias.hendrik@gmail.com
- **Location:** Tangerang, Indonesia
- **LinkedIn:** linkedin.com/in/zacharias-hendrik-27a002145

---

## Project Goal
Personal portfolio website for professional branding as a Backend Engineer specializing in enterprise systems, GIS, and fintech. Includes a public-facing website, a CMS for content management, and live demo subdomains for portfolio projects.

---

## Personal Branding

**Tagline:**
> "Backend Engineer building enterprise systems that scale — from geospatial platforms to fintech compliance."

**Core Pillars:**
1. Enterprise Backend Specialist — 7+ years, large-scale systems
2. GIS & Geospatial Expert — OpenLayers, WebGIS, government & NGO projects
3. Fintech & Compliance — Risk management, OJK/AFPI compliance

---

## Domain Structure

> Replace `yourdomain.com` with actual domain before starting.

| Subdomain | Purpose |
|---|---|
| `yourdomain.com` | Next.js public portfolio |
| `cms.yourdomain.com` | Payload CMS admin panel |
| `rumahtap.yourdomain.com` | Demo: RumahTAP |
| `blockassign.yourdomain.com` | Demo: BlockAssignment |
| `[project].yourdomain.com` | Future demo subdomains |

SSL: Wildcard certificate (`*.yourdomain.com`) via Let's Encrypt + Certbot DNS challenge.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14+ (App Router) |
| CMS | Payload CMS 2.x (Node.js) |
| Database | PostgreSQL 16 |
| Reverse Proxy | Nginx |
| Containerization | Docker + Docker Compose |
| SSL | Let's Encrypt (Certbot, wildcard) |
| Hosting | VPS (Hetzner / DigitalOcean) |
| Design | Minimalist + Dark mode |

---

## Site Pages

| Route | Description |
|---|---|
| `/` | Hero, tagline, CTA |
| `/about` | Bio, skills, experience timeline |
| `/projects` | Portfolio grid with filters |
| `/projects/[slug]` | Project detail page |
| `/demos` | Live demo cards with Launch buttons |
| `/contact` | Contact form + social links |

---

## Design System

- **Theme:** Dark mode (primary), with light mode toggle optional
- **Color Palette:**
  - Background: `#0a0a0a`
  - Surface: `#111111`
  - Border: `#1f1f1f`
  - Primary Accent: `#3b82f6` (blue)
  - Text Primary: `#f1f5f9`
  - Text Secondary: `#94a3b8`
- **Font:**
  - Heading: `Inter` or `Geist`
  - Body: `Inter`
  - Code/tags: `JetBrains Mono`
- **UI Style:** Clean cards, subtle borders, minimal shadows, badge-based tech tags

---

## VPS Architecture

```
VPS (Ubuntu 24.04)
│
├── Nginx (Port 80/443) — Reverse Proxy + SSL Termination
│
├── next-app (Port 3000) — Public Portfolio
├── payload-cms (Port 3001) — CMS Admin
├── demo-rumahtap (Port 3002) — Demo App
├── demo-blockassign (Port 3003) — Demo App
└── postgres (Port 5432) — Shared Database
```

All services run as Docker containers managed by Docker Compose.

---

## Phases

| Phase | File | Scope |
|---|---|---|
| 1 | `PHASE_1.md` | VPS setup, Docker, Nginx, SSL |
| 2 | `PHASE_2.md` | Payload CMS + PostgreSQL |
| 3 | `PHASE_3.md` | Content data (projects, experience) |
| 4 | `PHASE_4.md` | Next.js frontend |
| 5 | `PHASE_5.md` | Demo apps deployment |
| 6 | `PHASE_6.md` | Final QA & go live |
