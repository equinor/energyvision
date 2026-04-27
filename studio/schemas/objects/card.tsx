/* eslint-disable react/display-name */

import { BsCardHeading } from 'react-icons/bs'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'

export type Card = {
  _type: 'card'
  title?: PortableTextBlock[]
  content?: PortableTextBlock[]
}

export default {
  name: 'card',
  title: 'Card',

  type: 'object',
  localize: true,
  fields: [
    {
      name: 'title',
      type: 'text',
      description: `Will render as a big title statement if no content, if else regular heading and paragraph`,
      validation: (Rule: Rule) =>
        Rule.required().custom((value: string) => {
          if (!value || value.trim() === '') {
            return 'Card title cannot be empty.'
          }
          return true
        }),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Optional',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'simpleBlock' })],
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'content',
    },
    prepare({
      title,
      text,
    }: {
      title: PortableTextBlock[]
      text: PortableTextBlock[]
    }) {
      const plainTitle = blocksToText(title)
      return {
        title: plainTitle || 'Missing title',
        subtitle: blocksToText(text) || '',
        media: <BsCardHeading />,
      }
    },
  },
}
