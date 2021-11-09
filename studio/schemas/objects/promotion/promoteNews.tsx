import React from 'react'

import blocksToText from '../../../helpers/blocksToText'

import type { Block } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'

export type Promotion = {
  _type: 'promotion'
  type: 'news' | 'topic'
  title?: Block[]
  ingress?: Block[]
  background?: ColorListValue
}

export default {
  title: 'News promotion',
  name: 'promoteNews',
  type: 'object',

  fields: [
    {
      title: 'Tags',
      name: 'tags',
      type: 'tagReference',
      description: 'Feed in the latest 3 news that satisfies the tags',
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
          'Missing preview',
        subtitle: `News promotion.`,
      }
    },
  },
}
