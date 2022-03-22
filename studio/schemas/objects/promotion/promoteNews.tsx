import React from 'react'
import type { Rule } from '@sanity/types'
import { defaultLanguage } from '../../../languages'

export default {
  title: 'News promotion',
  name: 'promoteNews',
  type: 'object',
  fieldsets: [
    {
      title: 'Tags',
      name: 'tagFieldset',
      description: 'Feed in the latest 3 news that satisfies the tags',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Topic tags',
      name: 'tags',
      type: 'array',
      fieldset: 'tagFieldset',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
    },
    {
      title: 'Country tags',
      name: 'countryTags',
      type: 'array',
      fieldset: 'tagFieldset',
      of: [
        {
          type: 'reference',
          to: [{ type: 'countryTag' }],
          options: { disableNew: true },
        },
      ],
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
      countryTags1: `countryTags.0.title.${defaultLanguage.name}`,
      countryTags2: `countryTags.1.title.${defaultLanguage.name}`,
      countryTags3: `countryTags.2.title.${defaultLanguage.name}`,
      countryTags4: `countryTags.3.title.${defaultLanguage.name}`,
    },
    prepare({
      tags1,
      tags2,
      tags3,
      tags4,
      countryTags1,
      countryTags2,
      countryTags3,
      countryTags4,
    }: {
      tags1?: string
      tags2?: string
      tags3?: string
      tags4?: string
      countryTags1?: string
      countryTags2?: string
      countryTags3?: string
      countryTags4?: string
    }) {
      const tags = [tags1, tags2, tags3, countryTags1, countryTags2, countryTags3].filter(Boolean)
      const hasMoreTags = Boolean(tags4)
      const hasMoreCountryTags = Boolean(countryTags4)
      const title = tags.length > 0 ? `Tags: ${tags.join(', ')}` : ''
      return {
        title: hasMoreTags || hasMoreCountryTags ? `${title}…` : title,
        subtitle: `News promotion.`,
      }
    },
  },
}
