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
  title: 'Pull quote',
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
      type: 'text',
      title: 'Quote',
      description: 'Highlighted quote from the article.',
      rows: 5,
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    {
      name: 'authorTitle',
      type: 'string',
      title: 'Author title',
      description: 'Optional title for the author.',
    },
    {
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
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
