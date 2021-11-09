import React from 'react'

import blocksToText from '../../../helpers/blocksToText'
import type { Block, Rule } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'

export type Promotion = {
  _type: 'promotion'
  type: 'news' | 'topic'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

export default {
  title: 'Topic promotion',
  name: 'promoteTopics',
  type: 'object',

  fields: [
    {
      name: 'references',
      type: 'array',
      of: [
        {
          title: 'Choose a topic page to reference',
          type: 'reference',
          to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
          options: {
            filter: ({ document }: { document: any }) => ({
              filter: `_type == $routeLang `,
              params: { routeLang: `route_${document._lang}` },
            }),
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().min(3).max(3),
    },
  ],
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
      text: 'text',
    },
    prepare({ title = [], ingress, text }: { title: any[]; ingress: any; text: any }) {
      const textBlock = (text || []).find((introBlock: any) => introBlock._type === 'block')
      const ingressBlock = (ingress || []).find((introBlock: any) => introBlock._type === 'block')
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title:
          plainTitle ||
          (textBlock &&
            textBlock.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')) ||
          (ingressBlock &&
            ingressBlock.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')) ||
          'Missing content!',
        subtitle: `Topic promotions.`,
      }
    },
  },
}
