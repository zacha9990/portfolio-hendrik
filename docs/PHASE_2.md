# Phase 2 — Payload CMS Setup

## Goal
Scaffold and configure Payload CMS with all required collections to manage portfolio content: projects, demos, experience, skills, contact submissions, and site settings.

---

## Directory
Work inside: `/opt/hendrik-portfolio/payload-cms/`

---

## Step 1 — Scaffold Payload CMS

```bash
cd /opt/hendrik-portfolio
npx create-payload-app@latest payload-cms
# Choose: blank template
# Database: PostgreSQL
# Language: TypeScript
```

---

## Step 2 — Dockerfile for Payload CMS

Create `/opt/hendrik-portfolio/payload-cms/Dockerfile`:

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

---

## Step 3 — Collections

Create the following collection config files inside `payload-cms/src/collections/`.

---

### `Projects.ts`

```typescript
import { CollectionConfig } from 'payload/types'

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'company', 'period', 'is_featured'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'impact', type: 'textarea', label: 'Business Impact / Result' },
    { name: 'period', type: 'text', required: true, label: 'e.g. March 2024 – July 2024' },
    { name: 'role', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'customer', type: 'text' },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'GIS', value: 'gis' },
        { label: 'Fintech', value: 'fintech' },
        { label: 'Enterprise', value: 'enterprise' },
        { label: 'Government', value: 'government' },
        { label: 'Freelance', value: 'freelance' },
        { label: 'Android', value: 'android' },
      ],
    },
    {
      name: 'tech_stack',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'screenshots',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    { name: 'website_url', type: 'text', label: 'Website URL' },
    { name: 'playstore_url', type: 'text', label: 'Play Store URL' },
    { name: 'github_url', type: 'text', label: 'GitHub URL' },
    {
      name: 'is_confidential',
      type: 'checkbox',
      label: 'Confidential (hide screenshots/links)',
      defaultValue: false,
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      label: 'Featured on homepage',
      defaultValue: false,
    },
    {
      name: 'related_demo',
      type: 'relationship',
      relationTo: 'demos',
      hasMany: false,
    },
    { name: 'sort_order', type: 'number', defaultValue: 99 },
  ],
}

export default Projects
```

---

### `Demos.ts`

```typescript
import { CollectionConfig } from 'payload/types'

const Demos: CollectionConfig = {
  slug: 'demos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subdomain', 'port', 'is_active'],
    description: 'Each demo entry maps a subdomain + port to a running app on the VPS. After saving, run the nginx-sync script on the VPS to apply changes.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },

    // --- Routing config ---
    {
      name: 'subdomain',
      type: 'text',
      required: true,
      unique: true,
      label: 'Subdomain prefix (e.g. "rumahtap" → rumahtap.yourdomain.com)',
      admin: {
        description: 'Lowercase, no spaces, no dots. Just the prefix before yourdomain.com',
      },
    },
    {
      name: 'port',
      type: 'number',
      required: true,
      unique: true,
      label: 'Internal VPS port (e.g. 3002)',
      admin: {
        description: 'The port your demo app listens on inside the VPS. Must be unique per demo.',
      },
    },

    // --- Display ---
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'tech_stack',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },

    // --- Demo credentials ---
    {
      name: 'demo_credentials',
      type: 'group',
      label: 'Demo Login Credentials (optional)',
      fields: [
        { name: 'username', type: 'text' },
        { name: 'password', type: 'text' },
        { name: 'note', type: 'text', label: 'e.g. Login with this account to explore all features' },
      ],
    },

    // --- Status ---
    {
      name: 'is_active',
      type: 'checkbox',
      label: 'Active — show "Launch Demo" button on portfolio',
      defaultValue: true,
      admin: {
        description: 'Uncheck to hide the demo without deleting the record (e.g. app is down for maintenance).',
      },
    },

    // --- Relation ---
    {
      name: 'related_project',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: false,
    },
  ],
}

export default Demos
```

---

### `Experience.ts`

```typescript
import { CollectionConfig } from 'payload/types'

const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'period'],
  },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'location', type: 'text' },
    { name: 'role', type: 'text', required: true },
    { name: 'period', type: 'text', required: true, label: 'e.g. Sept 2023 – Present' },
    {
      name: 'tech_stack',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Key Achievements',
      fields: [{ name: 'item', type: 'text' }],
    },
    { name: 'sort_order', type: 'number', defaultValue: 99 },
  ],
}

export default Experience
```

---

### `Skills.ts`

```typescript
import { CollectionConfig } from 'payload/types'

const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Languages', value: 'languages' },
        { label: 'Frameworks', value: 'frameworks' },
        { label: 'Databases', value: 'databases' },
        { label: 'Tools & Platforms', value: 'tools' },
        { label: 'Specialty', value: 'specialty' },
      ],
    },
    { name: 'icon_name', type: 'text', label: 'Icon name (e.g. devicons class or emoji)' },
    { name: 'sort_order', type: 'number', defaultValue: 99 },
  ],
}

export default Skills
```

---

### `ContactSubmissions.ts`

```typescript
import { CollectionConfig } from 'payload/types'

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
  },
  access: {
    create: () => true,  // public can submit
    read: ({ req }) => req.user !== null, // only admin can read
    update: ({ req }) => req.user !== null,
    delete: ({ req }) => req.user !== null,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'subject',
      type: 'select',
      required: true,
      options: [
        { label: 'Hire Me', value: 'hire' },
        { label: 'Collaboration', value: 'collab' },
        { label: 'Freelance Project', value: 'freelance' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'is_read',
      type: 'checkbox',
      label: 'Mark as read',
      defaultValue: false,
    },
  ],
}

export default ContactSubmissions
```

---

### `SiteSettings.ts` (Global)

```typescript
import { GlobalConfig } from 'payload/types'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    { name: 'tagline', type: 'text', label: 'Hero Tagline' },
    { name: 'bio_short', type: 'textarea', label: 'Short Bio (for hero section)' },
    {
      name: 'availability_status',
      type: 'select',
      options: [
        { label: 'Open to Opportunities', value: 'open' },
        { label: 'Currently Unavailable', value: 'closed' },
        { label: 'Open to Freelance Only', value: 'freelance' },
      ],
      defaultValue: 'open',
    },
    {
      name: 'social_links',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'github', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'whatsapp', type: 'text', label: 'WhatsApp number (intl format, e.g. 6289674252886)' },
      ],
    },
    { name: 'cv_file', type: 'upload', relationTo: 'media', label: 'Downloadable CV/Resume' },
    { name: 'profile_photo', type: 'upload', relationTo: 'media' },
  ],
}

export default SiteSettings
```

---

## Step 4 — Media Collection

Add built-in Media collection in `payload.config.ts`:

```typescript
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import Projects from './collections/Projects'
import Demos from './collections/Demos'
import Experience from './collections/Experience'
import Skills from './collections/Skills'
import ContactSubmissions from './collections/ContactSubmissions'
import SiteSettings from './globals/SiteSettings'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: 'users',
  },
  collections: [
    Projects,
    Demos,
    Experience,
    Skills,
    ContactSubmissions,
    {
      slug: 'media',
      upload: {
        staticDir: 'media',
        imageSizes: [
          { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
          { name: 'card', width: 800, height: 600, position: 'centre' },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [{ name: 'alt', type: 'text' }],
    },
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
  ],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),
  typescript: { outputFile: 'src/payload-types.ts' },
})
```

---

## Step 5 — Enable CORS for Next.js

In `payload.config.ts`, add:

```typescript
cors: [
  'https://yourdomain.com',
  'http://localhost:3000', // for local dev
],
csrf: [
  'https://yourdomain.com',
  'http://localhost:3000',
],
```

---

## Step 6 — Build & Run

```bash
cd /opt/hendrik-portfolio
docker compose build payload-cms
docker compose up payload-cms -d
docker compose logs payload-cms -f
```

Visit `https://cms.yourdomain.com/admin` → create first admin account.

---

## Verification Checklist

- [ ] CMS accessible at `https://cms.yourdomain.com/admin`
- [ ] Admin account created
- [ ] All collections visible: Projects, Demos, Experience, Skills, Contact Submissions
- [ ] Globals visible: Site Settings
- [ ] Media upload working
- [ ] API accessible at `https://cms.yourdomain.com/api/projects`

---

## Next Phase
➡️ Proceed to `PHASE_3.md` — Enter all content data into CMS
