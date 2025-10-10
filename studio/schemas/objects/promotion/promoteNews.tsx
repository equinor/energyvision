import type { Rule } from 'sanity'
import { TiNews } from 'react-icons/ti'
import { Flags } from '../../../src/lib/datasetHelpers'
import { background, ingress, title, viewAllLink, viewAllLinkLabel } from '../commonFields/commonFields'
import { PortableTextBlock } from '@portabletext/react'
import blocksToText from '../../../helpers/blocksToText'

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
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
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
    Flags.HAS_LOCAL_NEWS && {
      title: 'Local news tags',
      name: 'localNewsTags',
      type: 'array',
      fieldset: 'tagFieldset',
      of: [
        {
          type: 'reference',
          to: [{ type: 'localNewsTag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
      options: { sortable: false },
    },
    viewAllLink,
    viewAllLinkLabel,
    background,
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      tags: 'tags',
      countryTags: 'countryTags',
      localNewsTags: 'localNewsTags',
    },
    prepare({
      title,
      tags,
      countryTags,
      localNewsTags,
    }: {
      title?: PortableTextBlock[]
      tags?: string[]
      countryTags?: string[]
      localNewsTags?: string[]
    }) {
      //@ts-ignore:todo
      const plainTitle = blocksToText(title) ?? 'No title, only news'
      const tagsCount = tags?.length
      const countryTagsCount = countryTags?.length
      const localNewsTagsCount = localNewsTags?.length

      return {
        title: plainTitle,
        subtitle: `News promotion 
        ${tags && tags?.length > 0 ? `| ${tagsCount} tags` : ''}
        ${countryTags && countryTags?.length > 0 ? `| ${countryTagsCount} countryTags` : ''}
        ${localNewsTags && localNewsTags?.length > 0 ? `| ${localNewsTagsCount} localNewsTags` : ''}
        `,
        media: TiNews,
      }
    },
  },
}
