import React from 'react'

import type { Rule } from '@sanity/types'
import { defaultLanguage } from '../../../languages'

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
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
    },
  ],
  preview: {
    select: {
      tags1: `tags.0.title.${defaultLanguage.name}`,
      tags2: `tags.1.title.${defaultLanguage.name}`,
      tags3: `tags.2.title.${defaultLanguage.name}`,
      tags4: `tags.3.title.${defaultLanguage.name}`,
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
