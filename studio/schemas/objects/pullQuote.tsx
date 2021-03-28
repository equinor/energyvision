import React from 'react'
import { SchemaType } from '../../types'
import { format_quote } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

type PreviewProps = {
  title: string
  author: string
}

export default {
  name: 'pullQuote',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Pull Quote',
      name: 'pullQuote',
    },
  ],
  fields: [
    {
      name: 'quote',
      type: 'string',
      title: 'Quote',
      description: 'Highlighted quote from the article.',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    { name: 'image', type: 'image' },
  ],
  preview: {
    select: {
      title: 'quote',
      author: 'author',
    },
    prepare({ title, author }: PreviewProps): SchemaType.Preview {
      return {
        title: title,
        subtitle: `By: ${author}`,
        media: <div>{EdsIcon(format_quote)}</div>,
      }
    },
  },
}
