# Phase 6 — Final QA & Go Live

## Goal
Run final checks across all services, fix any issues, optimize performance, and officially launch the portfolio.

---

## 1. Functional QA Checklist

### Public Website (`yourdomain.com`)
- [ ] Homepage loads with correct name, tagline, availability badge
- [ ] Featured projects shown in homepage grid
- [ ] `/about` — bio, skills grouped by category, experience timeline all render correctly
- [ ] `/projects` — all 23 projects listed, pagination or full list loads
- [ ] Project filter by category works (GIS, Fintech, Enterprise, Government, Freelance)
- [ ] `/projects/[slug]` — each project detail page renders correctly
- [ ] Confidential projects show "Confidential" badge and no screenshots/links
- [ ] `/demos` — demo cards load with correct thumbnails and Launch Demo buttons
- [ ] Launch Demo buttons open correct subdomain in new tab
- [ ] Inactive demos show "Currently Unavailable" label
- [ ] `/contact` — form submits successfully
- [ ] Submitted contact appears in Payload CMS admin → Contact Submissions

### CMS (`cms.yourdomain.com`)
- [ ] Admin login works
- [ ] All collections accessible: Projects, Demos, Experience, Skills, Contact Submissions
- [ ] Site Settings global is editable
- [ ] Toggling `is_featured` on a project reflects on frontend (after revalidation)
- [ ] Toggling `is_active` on a demo hides/shows Launch button
- [ ] Toggling `availability_status` updates badge on frontend
- [ ] Media uploads work (images, CV file)

### Demo Apps
- [ ] Each demo subdomain loads over HTTPS
- [ ] Demo data is seeded and visible
- [ ] Demo mode banner visible in each demo app
- [ ] Login with demo credentials works

---

## 2. Mobile Responsiveness

Test on at least 3 viewport sizes:
- [ ] Mobile (375px) — iPhone SE
- [ ] Tablet (768px) — iPad
- [ ] Desktop (1280px+)

Check:
- [ ] Navbar collapses to hamburger on mobile
- [ ] Project grid switches to 1-column on mobile
- [ ] Contact form is usable on mobile
- [ ] Demo cards stack properly on mobile

---

## 3. Performance Checks

```bash
# Run Lighthouse from CLI (install globally)
npm install -g lighthouse

# Check homepage score
lighthouse https://yourdomain.com --output=html --output-path=report.html
```

Target scores:
- Performance: > 85
- Accessibility: > 90
- SEO: > 90

Common fixes:
- Add `next/image` with proper `width`, `height`, and `alt` for all images
- Enable Next.js ISR (revalidate) for data fetching
- Ensure all pages have `<title>` and `<meta description>`

---

## 4. SEO Basics

- [ ] `robots.txt` accessible at `yourdomain.com/robots.txt`
- [ ] `sitemap.xml` generated and accessible at `yourdomain.com/sitemap.xml`
- [ ] Each page has unique `<title>` and `<meta description>`
- [ ] Open Graph tags set (for LinkedIn/social sharing)
- [ ] Profile photo and project images have proper `alt` text

Add sitemap in Next.js (`src/app/sitemap.ts`):

```typescript
import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { docs: projects } = await getProjects()
  const base = process.env.NEXT_PUBLIC_SITE_URL

  const projectUrls = projects.map((p: any) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
  }))

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/demos`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    ...projectUrls,
  ]
}
```

---

## 5. Security Hardening

```bash
# Check open ports
ss -tulnp

# Only these should be exposed to internet:
# 80 (Nginx → HTTP redirect)
# 443 (Nginx → HTTPS)
# 22 (SSH)

# All other ports (3000, 3001, 3002...) should be internal only
# Verify via Docker network — these should NOT be bound to 0.0.0.0
```

Update `docker-compose.yml` — change demo port bindings from `3002:3002` to `127.0.0.1:3002:3002` to prevent direct external access:

```yaml
ports:
  - "127.0.0.1:3000:3000"   # Next.js
  - "127.0.0.1:3001:3000"   # Payload CMS
  - "127.0.0.1:3002:3002"   # Demo RumahTAP
  - "127.0.0.1:3003:3003"   # Demo BlockAssignment
```

Other security checks:
- [ ] SSH password login disabled (key-only)
- [ ] Fail2Ban installed
- [ ] UFW firewall: only allow 22, 80, 443

```bash
apt install fail2ban ufw -y
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## 6. Monitoring (Optional but Recommended)

```bash
# Install Uptime Kuma for simple status monitoring
docker run -d \
  --name uptime-kuma \
  --restart unless-stopped \
  -p 127.0.0.1:3050:3001 \
  -v uptime-kuma:/app/data \
  louislam/uptime-kuma:1
```

Add monitors for:
- `https://yourdomain.com`
- `https://cms.yourdomain.com`
- Each demo subdomain

---

## 7. Backup Strategy

```bash
# Create a daily backup script
cat > /opt/hendrik-portfolio/scripts/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/opt/backups

mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker exec portfolio_postgres pg_dumpall -U hendrik > $BACKUP_DIR/db_$DATE.sql

# Backup uploaded media
tar -czf $BACKUP_DIR/media_$DATE.tar.gz /opt/hendrik-portfolio/payload-cms/media

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup complete: $DATE"
EOF

chmod +x /opt/hendrik-portfolio/scripts/backup.sh

# Schedule daily at 1 AM
crontab -e
# Add:
0 1 * * * /opt/hendrik-portfolio/scripts/backup.sh >> /var/log/portfolio-backup.log 2>&1
```

---

## 8. Go Live Announcement Checklist

- [ ] LinkedIn post announcing the new portfolio
- [ ] Update LinkedIn profile URL to `yourdomain.com`
- [ ] Update email signature with portfolio URL
- [ ] Test sharing URL on LinkedIn (check OG preview)
- [ ] Share in relevant communities/groups

---

## Final Architecture Summary

```
yourdomain.com (A record) ──────────────────────────────┐
*.yourdomain.com (wildcard A record) ───────────────────┤
                                                         ▼
                                               VPS (Ubuntu 24.04)
                                                         │
                                              Nginx (80/443 + SSL)
                                           ┌──────────────┴─────────────────┐
                                           │                                │
                         yourdomain.com   cms.yourdomain.com   *.yourdomain.com
                                │                 │                   │
                          Next.js :3000    Payload CMS :3001    Demo Apps :300x
                                                  │
                                           PostgreSQL :5432
```

---

## 🎉 Launch!

Once all boxes are checked:

```bash
cd /opt/hendrik-portfolio
docker compose up -d
docker compose ps  # verify all containers healthy
```

Your portfolio is live at `https://yourdomain.com` 🚀
