import { CollectionConfig } from 'payload/types'

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req }) => req.user !== null,
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
