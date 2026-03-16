import { CollectionConfig } from 'payload/types'

const Skills: CollectionConfig = {
  slug: 'skills',
  access: { read: () => true },
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
