import { CollectionConfig } from 'payload/types'

const PageViews: CollectionConfig = {
  slug: 'page-views',
  admin: {
    useAsTitle: 'page',
    defaultColumns: ['page', 'country', 'city', 'createdAt'],
    description: 'Page visit tracking data.',
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
    update: () => false,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'page', type: 'text', required: true, label: 'Page' },
    { name: 'country', type: 'text', label: 'Country' },
    { name: 'country_code', type: 'text', label: 'Country Code' },
    { name: 'city', type: 'text', label: 'City' },
    { name: 'ip_hash', type: 'text', label: 'IP Hash' },
  ],
}

export default PageViews
