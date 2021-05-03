import React from 'react'
import { SchemaType } from '../../types'

export default {
  type: 'object',
  name: 'downloadableImage',
  title: 'Image',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'label',
      image: 'image',
    },
    prepare({ title = '', image }: { title: string; image: any }) {
      return {
        title,
        media: image,
        subtitle: 'Image',
      }
    },
  },
}
