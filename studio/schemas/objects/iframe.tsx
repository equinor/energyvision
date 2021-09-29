import React from 'react'
import { code } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'

export default {
  title: 'IFrame',
  name: 'iframe',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of the iframe. This value is not visible on the page but is required for accessibility.',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Link to the content to be loaded inside the iframe.',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' },
        ],
        layout: 'dropdown',
      },
      initialValue: '16:9',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: string }): SchemaType.Preview {
      return {
        title: title,
        subtitle: `IFrame component`,
        media: EdsIcon(code),
      }
    },
  },
}
