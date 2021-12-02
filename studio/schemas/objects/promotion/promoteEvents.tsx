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
}

export default {
  title: 'Events promotion',
  name: 'promoteEvents',
  type: 'object',
  fieldsets: [
    {
      title: 'Filter based on',
      name: 'tag',
    },
  ],
  fields: [
    {
      // Pick events from a list
      // Choose events by tags
      // Use as switch to choose between selected and automated?

      // @TODO
      // I guess we need some separate tags for the event? Or? Fernando to do something here #628
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Feed in all the upcoming events that satisfies the tags',
      validation: (Rule: Rule) => Rule.unique(),
      options: { list: eventTags },
      hidden: ({ parent }: { parent: Event }) => parent?.noTags === true,
      fieldset: 'tag',
    },
    {
      name: 'noTags',
      type: 'boolean',
      title: `Don't filter based on tags`,
      options: {
        isHighlighted: true,
      },
      initialValue: false,
      fieldset: 'tag',
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
