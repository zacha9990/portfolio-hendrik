import { GlobalConfig } from 'payload/types'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
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
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp number (intl format, e.g. 6289674252886)',
        },
      ],
    },
    { name: 'cv_file', type: 'upload', relationTo: 'media', label: 'Downloadable CV/Resume' },
    { name: 'profile_photo', type: 'upload', relationTo: 'media' },
  ],
}

export default SiteSettings
