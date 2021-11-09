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
      tags1: 'tags.0.title.en_GB',
      tags2: 'tags.1.title.en_GB',
      tags3: 'tags.2.title.en_GB',
      tags4: 'tags.3.title.en_GB',
    },
    prepare({ tags1, tags2, tags3, tags4 }: { tags1?: string; tags2?: string; tags3?: string; tags4?: string }) {
      const tags = [tags1, tags2, tags3].filter(Boolean)
      const hasMoreTags = Boolean(tags4)
      const title = tags.length > 0 ? `Tags: ${tags.join(', ')}` : ''
      return {
        title: hasMoreTags ? `${title}…` : title,
        subtitle: `News promotion.`,
      }
    },
  },
}
