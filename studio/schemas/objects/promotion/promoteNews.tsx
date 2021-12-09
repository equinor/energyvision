import React from 'react'

import type { Rule } from '@sanity/types'
import { languages } from '../../languages'

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
      tags1: `tags.0.title.${languages[0].name}`,
      tags2: `tags.1.title.${languages[0].name}`,
      tags3: `tags.2.title.${languages[0].name}`,
      tags4: `tags.3.title.${languages[0].name}`,
    },
    prepare({ tags1, tags2, tags3, tags4 }: { tags1?: string; tags2?: string; tags3?: string; tags4?: string }) {
      const tags = [tags1, tags2, tags3].filter(Boolean)
      const hasMoreTags = Boolean(tags4)
      const title = tags.length > 0 ? `Tags: ${tags.join(', ')}` : ''
      /* @TODO: Make preview lang agnostic */
      return {
        title: hasMoreTags ? `${title}…` : title,
        subtitle: `News promotion.`,
      }
    },
  },
}
