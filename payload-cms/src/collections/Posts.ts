import { CollectionConfig } from 'payload/types'

const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'published_at', 'is_featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "my-first-post"',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary shown on blog listing page (1–2 sentences)',
      },
    },
    {
      name: 'cover_image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Full article content — supports headings, lists, links, code blocks, images, etc.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'published_at',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Leave blank to use creation date',
      },
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on homepage / featured section' },
    },
    {
      name: 'read_time',
      type: 'number',
      admin: { description: 'Estimated read time in minutes' },
    },
  ],
}

export default Posts
