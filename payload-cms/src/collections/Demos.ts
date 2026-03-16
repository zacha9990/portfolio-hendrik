import { CollectionConfig } from 'payload/types'

const Demos: CollectionConfig = {
  slug: 'demos',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'subdomain', 'port', 'is_active'],
    description:
      'Each demo entry maps a subdomain + port to a running app on the VPS. After saving, run the nginx-sync script on the VPS to apply changes.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'subdomain',
      type: 'text',
      required: true,
      unique: true,
      label: 'Subdomain prefix (e.g. "rumahtap" → rumahtap.qz-hendrik.com)',
      admin: {
        description: 'Lowercase, no spaces, no dots. Just the prefix before the domain.',
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
