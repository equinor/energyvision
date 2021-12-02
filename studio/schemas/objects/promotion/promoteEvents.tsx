import React from 'react'

import type { Rule } from '@sanity/types'

// @TODO: How to do tags
const eventTags = [
  { value: 'tag1', title: 'Tag one' },
  { value: 'tag2', title: 'Tag two' },
]

export type Event = {
  noTags: boolean
  tags: string[]
  selectEvents: boolean
}

export default {
  title: 'Events promotion',
  name: 'promoteEvents',
  type: 'object',

  fields: [
    {
      name: 'selectEvents',
      type: 'boolean',
      title: 'Manually select events',
      description: `Use this option if you want to manually select the events to promote`,
      initialValue: false,
    },
    {
      // @TODO
      // I guess we need some separate tags for the event? Or? Fernando to do something here #628
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Feed in all the upcoming events that satisfies the tags',
      validation: (Rule: Rule) => Rule.unique(),
      options: { list: eventTags },
      hidden: ({ parent }: { parent: Event }) => parent?.noTags === true || parent?.selectEvents === true,
    },
    {
      name: 'noTags',
      type: 'boolean',
      title: `Don't filter based on tags`,
      options: {
        isHighlighted: true,
      },
      initialValue: false,
      hidden: ({ parent }: { parent: Event }) => parent?.selectEvents === true,
    },
    {
      title: 'Events to be promoted',
      name: 'reference',
      description: 'Select the events you want to promote',
      type: 'reference',
      to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
      options: {
        filter: ({ document }: { document: any }) => ({
          filter: `_type == $routeLang && content->_type == "event"`,
          params: { routeLang: `route_${document._lang}` },
        }),
      },
      hidden: ({ parent }: { parent: Event }) => parent?.selectEvents === false,
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
        subtitle: `Events promotion.`,
      }
    },
  },
}
