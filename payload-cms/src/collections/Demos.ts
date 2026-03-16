import { CollectionConfig } from 'payload/types'

const Demos: CollectionConfig = {
  slug: 'demos',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'port', 'is_active'],
    description:
      'Each demo entry maps a port to a running app on the VPS. Demo URL: https://qz-hendrik.com:<PORT>. After saving, make sure Nginx on the VPS exposes that port with SSL.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'subdomain',
      type: 'text',
      required: false,
      unique: false,
      label: 'Subdomain prefix (opsional — untuk masa depan jika pakai wildcard SSL)',
      admin: {
        description:
          'Sementara tidak dipakai karena SSL gratis tidak mendukung wildcard. Kosongkan saja.',
      },
    },
    {
      name: 'port',
      type: 'number',
      required: true,
      unique: true,
      label: 'Port publik VPS (e.g. 3002 → https://qz-hendrik.com:3002)',
      admin: {
        description:
          'Port yang diekspos ke publik via Nginx + SSL. Demo akan diakses di https://qz-hendrik.com:<port>. Harus unik per demo.',
      },
    },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'tech_stack',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    {
      name: 'demo_credentials',
      type: 'group',
      label: 'Demo Login Credentials (optional)',
      fields: [
        { name: 'username', type: 'text' },
        { name: 'password', type: 'text' },
        {
          name: 'note',
          type: 'text',
          label: 'e.g. Login with this account to explore all features',
        },
      ],
    },
    {
      name: 'is_active',
      type: 'checkbox',
      label: 'Active — show "Launch Demo" button on portfolio',
      defaultValue: true,
      admin: {
        description:
          'Uncheck to hide the demo without deleting the record (e.g. app is down for maintenance).',
      },
    },
    {
      name: 'related_project',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: false,
    },
  ],
}

export default Demos
