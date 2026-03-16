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
