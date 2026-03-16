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
