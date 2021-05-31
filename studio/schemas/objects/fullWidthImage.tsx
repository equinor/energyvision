import { SchemaType } from '../../types'

export default {
  name: 'fullWidthImage',
  title: 'Full width image',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      alt: 'image.alt',
      image: 'image.asset',
    },
    prepare({ alt, image }: { alt: string; image: any }) {
      return {
        title: `Alt text: ${alt}`,
        subtitle: 'Full width image',
        media: image,
      }
    },
  },
}
