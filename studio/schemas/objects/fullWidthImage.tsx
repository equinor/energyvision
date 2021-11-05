import type { Rule, Reference } from '@sanity/types'
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
      type: 'imageWithAlt',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      alt: 'image.alt',
      image: 'image.asset',
    },
    prepare({ alt, image }: { alt: string; image: Reference }) {
      return {
        title: `Alt text: ${alt}`,
        subtitle: 'Full width image',
        media: image,
      }
    },
  },
}
