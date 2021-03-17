import React from 'react'
import { format_quote } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

type PreviewProps = {
  title: string
  author: string
}

type BlockQuotePreview = {
  title: string
  subtitle: string
  media: JSX.Element
}

export default {
  name: 'blockQuote',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Block Quote',
      name: 'blockQuote',
    },
  ],
  fields: [
    { name: 'quote', type: 'string', title: 'Quote', validation: (Rule: any) => Rule.required() },
    { name: 'author', type: 'string', title: 'Author', validation: (Rule: any) => Rule.required() },
    { name: 'image', type: 'image' },
  ],
  preview: {
    select: {
      title: 'quote',
      author: 'author',
    },
    prepare({ title, author }: PreviewProps): BlockQuotePreview {
      return {
        title: title,
        subtitle: `By: ${author}`,
        media: <div>{EdsIcon(format_quote)}</div>,
      }
    },
  },
}
