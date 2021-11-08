import React from 'react'
import blocksToText from '../../../helpers/blocksToText'

import type { Rule, Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'

export type Promotion = {
  _type: 'promotion'
  type: 'news' | 'topic'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

export default {
  title: 'Promotion',
  name: 'promotion',
  type: 'object',

  fields: [
    {
      type: 'array',
      name: 'promotion',
      description: 'Choose a type to promote',
      title: 'Promoted content',
      of: [
        { type: 'promoteNews', title: 'Promote news' },
        { type: 'promoteTopics', title: 'Promote topic' },
      ],
      validation: (Rule: Rule) => Rule.required().min(1).max(1),
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
          'What to preview',
        subtitle: `Promotions.`,
      }
    },
  },
}
