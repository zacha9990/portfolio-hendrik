# Phase 4 — Next.js Frontend

## Goal
Build the public-facing portfolio website using Next.js 14 (App Router). Data is fetched from Payload CMS REST API. Design is minimalist dark mode.

---

## Directory
Work inside: `/opt/hendrik-portfolio/next-app/`

---

## Step 1 — Scaffold Next.js

```bash
cd /opt/hendrik-portfolio
npx create-next-app@latest next-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd next-app
npm install
```

---

## Step 2 — Dockerfile

Create `/opt/hendrik-portfolio/next-app/Dockerfile`:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

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

## Step 3 — Environment Variables

Create `/opt/hendrik-portfolio/next-app/.env.local` (for local dev):

```env
NEXT_PUBLIC_PAYLOAD_API=https://cms.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Step 4 — Design System (Tailwind Config)

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#1f1f1f',
        accent: '#3b82f6',
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

Add Google Fonts in `src/app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

---

## Step 5 — Global Layout

### `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zacharias Hendrik — Backend Engineer',
  description: 'Backend Engineer specializing in enterprise systems, GIS, and fintech compliance.',
  openGraph: {
    title: 'Zacharias Hendrik — Backend Engineer',
    description: 'Backend Engineer specializing in enterprise systems, GIS, and fintech compliance.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Zacharias Hendrik',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-bg text-text-primary min-h-screen`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## Step 6 — API Helper

Create `src/lib/payload.ts`:

```typescript
const API = process.env.NEXT_PUBLIC_PAYLOAD_API

export async function getProjects(params?: { featured?: boolean; category?: string }) {
  const query = new URLSearchParams({ limit: '100' })
  if (params?.featured) query.append('where[is_featured][equals]', 'true')
  if (params?.category) query.append('where[category][contains]', params.category)
  const res = await fetch(`${API}/projects?${query}`, { next: { revalidate: 3600 } })
  return res.json()
}

export async function getProject(slug: string) {
  const res = await fetch(`${API}/projects?where[slug][equals]=${slug}&depth=2`, { next: { revalidate: 3600 } })
  const data = await res.json()
  return data.docs?.[0] ?? null
}

export async function getDemos() {
  const res = await fetch(`${API}/demos?where[is_active][equals]=true&limit=20`, { next: { revalidate: 3600 } })
  return res.json()
}

export async function getExperience() {
  const res = await fetch(`${API}/experience?sort=sort_order&limit=20`, { next: { revalidate: 3600 } })
  return res.json()
}

export async function getSkills() {
  const res = await fetch(`${API}/skills?sort=sort_order&limit=100`, { next: { revalidate: 3600 } })
  return res.json()
}

export async function getSiteSettings() {
  const res = await fetch(`${API}/globals/site-settings`, { next: { revalidate: 3600 } })
  return res.json()
}

export async function submitContact(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const res = await fetch(`${API}/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
```

---

## Step 7 — Pages

### `src/app/page.tsx` — Homepage (Hero + Featured Projects)

**Sections:**
1. **Hero** — Name, tagline, availability badge, CTA buttons ("View Projects", "Contact Me")
2. **Featured Projects** — Grid of 6 featured project cards
3. **CTA Strip** — "Have a project in mind? Let's talk."

**Hero Component Details:**
```
[Availability Badge — "Open to Opportunities" (green dot)]
Zacharias Hendrik
[Tagline from CMS]
Backend Engineer · GIS · Fintech · Enterprise Systems

[View Projects]  [Contact Me]
```

---

### `src/app/about/page.tsx` — About Page

**Sections:**
1. **Bio** — Photo + short bio text from CMS
2. **Skills Grid** — Grouped by category (Languages, Frameworks, Databases, Tools, Specialty). Each skill = a badge/pill.
3. **Experience Timeline** — Vertical timeline, reverse chronological. Each entry: company, role, period, tech tags, bullet highlights.
4. **Education** — Gadjah Mada University, Associate Degree, 2008–2015

---

### `src/app/projects/page.tsx` — Projects Grid

**Features:**
- Filter bar: All · GIS · Fintech · Enterprise · Government · Freelance
- Grid of project cards (3 columns desktop, 2 tablet, 1 mobile)
- Each card: thumbnail or placeholder, title, company, period, category badge, tech stack pills, "View Details" button
- Confidential projects: show card with "Confidential" badge, no screenshots/links

---

### `src/app/projects/[slug]/page.tsx` — Project Detail

**Sections:**
1. Back button → `/projects`
2. Hero: Title, role, company, customer, period
3. Tech stack badges
4. Description paragraph
5. Business Impact / Results (if available)
6. Screenshots gallery (if not confidential)
7. Links: Website, Play Store, GitHub (if available)
8. "Confidential" notice (if is_confidential = true)
9. Related Demo button (if demo exists)

---

### `src/app/demos/page.tsx` — Live Demos

**Layout:**
- Intro text: "Explore live working demos of selected projects."
- Grid of demo cards
- Each card: thumbnail, title, description, tech badges, "Launch Demo →" button (opens subdomain in new tab)
- If `is_active = false`: show card with "Currently Unavailable" instead of launch button

---

### `src/app/contact/page.tsx` — Contact

**Sections:**
1. Heading + subtext: "Available for hire, freelance, and collaboration."
2. Availability badge from CMS
3. Contact form:
   - Name (text)
   - Email (email)
   - Subject (select: Hire Me / Collaboration / Freelance / Other)
   - Message (textarea)
   - Submit button
4. Alternative contact: LinkedIn icon, Email icon, WhatsApp icon

**Form behavior:**
- Client-side submission to Payload CMS API (`POST /api/contact-submissions`)
- Success state: "Thank you! I'll get back to you soon."
- Error state: "Something went wrong. Please try again or email me directly."

---

## Step 8 — Components Needed

| Component | Description |
|---|---|
| `Navbar` | Logo/name, nav links, mobile hamburger |
| `Footer` | Name, social links, copyright |
| `ProjectCard` | Card with thumbnail, title, badges, CTA |
| `DemoCard` | Card with thumbnail, Launch Demo button |
| `TechBadge` | Pill badge for technology name |
| `CategoryFilter` | Filter buttons for projects page |
| `ExperienceItem` | Timeline entry for work experience |
| `SkillsGrid` | Grouped skill badges |
| `ContactForm` | Form with client-side submission |
| `AvailabilityBadge` | Green/yellow/red dot + status text |

---

## Step 9 — SEO & Metadata

Each page should export dynamic metadata:

```typescript
// Example for project detail
export async function generateMetadata({ params }) {
  const project = await getProject(params.slug)
  return {
    title: `${project.title} — Zacharias Hendrik`,
    description: project.description,
  }
}
```

---

## Step 10 — Build & Deploy

```bash
cd /opt/hendrik-portfolio
docker compose build next-app
docker compose up next-app -d
docker compose logs next-app -f
```

---

## Verification Checklist

- [ ] `https://yourdomain.com` — Hero page loads with correct tagline
- [ ] `/about` — Bio, skills, experience timeline displayed
- [ ] `/projects` — All projects load, filters work
- [ ] `/projects/[slug]` — Detail page renders per project
- [ ] `/demos` — Demo cards show, Launch button links to subdomain
- [ ] `/contact` — Form submits successfully, appears in CMS
- [ ] Mobile responsive on all pages
- [ ] No broken images

---

## Next Phase
➡️ Proceed to `PHASE_5.md` — Deploy demo apps
