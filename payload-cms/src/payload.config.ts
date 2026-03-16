import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'

import Projects from './collections/Projects'
import Demos from './collections/Demos'
import Experience from './collections/Experience'
import Skills from './collections/Skills'
import ContactSubmissions from './collections/ContactSubmissions'
import SiteSettings from './globals/SiteSettings'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Projects,
    Demos,
    Experience,
    Skills,
    ContactSubmissions,
    {
      slug: 'media',
      access: { read: () => true },
      upload: {
        staticDir: path.resolve(__dirname, '../media'),
        imageSizes: [
          { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
          { name: 'card', width: 800, height: 600, position: 'centre' },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*', 'application/pdf'],
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
    push: true,
  }),
  cors: [
    'https://qz-hendrik.com',
    'https://www.qz-hendrik.com',
    'http://localhost:3000',
  ],
  csrf: [
    'https://qz-hendrik.com',
    'https://www.qz-hendrik.com',
    'http://localhost:3000',
  ],
  typescript: { outputFile: path.resolve(__dirname, 'payload-types.ts') },
})
