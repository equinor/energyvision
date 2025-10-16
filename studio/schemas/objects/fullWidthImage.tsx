import type { Rule, Reference } from 'sanity'
import type { ImageWithAlt } from './imageWithAlt'

export type FullWidthImage = {
  _type: 'fullWidthImage'
  image: ImageWithAlt
}

export default {
  name: 'fullWidthImage',
  title: 'Full width image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAltAndCaption',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '10:3', value: '10:3' },
          { title: '2:1', value: '2:1' },
        ],
        layout: 'dropdown',
      },
      initialValue: '16:9',
    },
  ],
  preview: {
    select: {
      alt: 'image.alt',
      image: 'image.image.asset',
    },
    prepare({ alt, image }: { alt: string; image: Reference }) {
      const altText = alt === undefined ? 'Decorative image' : alt
      return {
        title: `Alt text: ${altText}`,
        subtitle: 'Full width image',
        media: image,
      }
    },
  },
}
