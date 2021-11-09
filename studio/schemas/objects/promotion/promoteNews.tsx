import React from 'react'
import { Colors } from '../../../helpers/ColorListValues'

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
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Tags',
      name: 'tags',
      type: 'tagReference',
      description: 'Feed in the latest 3 news that satisfies the tags',
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
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
