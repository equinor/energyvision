import type { Reference } from 'sanity'

export type ImageWithAlt = {
  _type: string
  asset: Reference
  isDecorative?: boolean
  alt?: string
}

export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    collapsed: false,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text for screen readers',
      description:
        'Recommended. Describe whats seen in the image. Leave empty if purely decorative.',
    },
  ],
}
