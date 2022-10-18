import React from 'react'

import type { Rule, Reference, ValidationContext, Block } from '@sanity/types'
import blocksToText from '../../../helpers/blocksToText'
import routes from '../../routes'
import { filterByRouteEvents } from '../../../helpers/referenceFilters'
import { EdsIcon } from '../../../icons'
import { calendar_event } from '@equinor/eds-icons'

// @TODO: How to do tags
const eventTags = [
  { value: 'tag1', title: 'Tag one' },
  { value: 'tag2', title: 'Tag two' },
  { value: 'tag3', title: 'Tag three' },
  { value: 'tag4', title: 'Tag four' },
]

export type Event = {
  tags: string[]
  manuallySelectEvents: boolean
  promotedEvents: Reference[]
  promotePastEvents: boolean
}

export default {
  title: 'Events promotion',
  name: 'promoteEvents',
  type: 'object',

  fields: [
    {
      name: 'manuallySelectEvents',
      type: 'boolean',
      title: 'Manually select events',
      description: `Use this option if you want to manually select the events to promote`,
      initialValue: false,
    },
    {
      name: 'promotePastEvents',
      type: 'boolean',
      title: 'Select past events',
      description: `Enable this to automatically pick past events, otherwise future events are picked`,
      initialValue: false,
      hidden: ({ parent }: { parent: Event }) => parent?.manuallySelectEvents === true,
    },
    {
      name: 'pastEventsCount',
      title: 'How many number of past events to show?',
      type: 'number',
      description: 'Leave empty to show all the past events (max limit 50).',
      validation: (Rule: Rule) => Rule.integer().positive().greaterThan(0).lessThan(50),
      hidden: ({ parent }: { parent: Event }) => parent?.promotePastEvents === false,
    },
    {
      // @TODO
      // I guess we need some separate tags for the event? Or? Fernando to do something here #628
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          title: 'Select the event tag(s) to promote',
          type: 'reference',
          to: [{ type: 'eventTag' }],
          options: { disableNew: true },
        },
      ],
      hidden: ({ parent }: { parent: Event }) => parent?.manuallySelectEvents === true,
    },

    {
      title: 'Events to be promoted',
      name: 'promotedEvents',
      description: 'Select the events you want to promote',
      type: 'array',
      of: [
        {
          title: 'Add event',
          type: 'reference',
          to: routes,
          options: {
            filter: filterByRouteEvents,
            disableNew: true,
          },
        },
      ],
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: Event }
          // return validateRequiredIfVisible(!parent?.manuallySelectEvents, value, 'You must choose at least one event')
          if (!parent.manuallySelectEvents) return true
          if (!value || value.length === 0) return 'You must select at least one event'
          return true
        }).unique(),

      hidden: ({ parent }: { parent: Event }) => parent?.manuallySelectEvents === false,
    },
  ].filter((e) => e),
  // When you play the game of previews, you win or you die
  preview: {
    select: {
      tags1: 'tags.0',
      tags2: 'tags.1',
      tags3: 'tags.2',
      tags4: 'tags.3',
      reference1: 'promotedEvents.0.content.title',
      reference2: 'promotedEvents.1.content.title',
      reference3: 'promotedEvents.2.content.title',
      manually: 'manuallySelectEvents',
      promotePastEvents: 'promotePastEvents',
      pastEventsCount: 'pastEventsCount',
    },
    prepare({
      tags1,
      tags2,
      tags3,
      tags4,
      reference1,
      reference2,
      reference3,
      manually,
      promotePastEvents,
      pastEventsCount,
    }: {
      tags1?: string
      tags2?: string
      tags3?: string
      tags4?: string
      reference1: Block[]
      reference2: Block[]
      reference3: Block[]
      manually: boolean
      pastEventsCount?: number
      promotePastEvents: boolean
    }) {
      // @TODO: Figure out how to do tags
      const getTagTitle = (id: string | undefined) => {
        if (!id) return undefined
        const tag = eventTags.find((tag) => tag.value === id)
        return tag?.title
      }
      let title
      if (manually) {
        const plainTitle1 = reference1 ? blocksToText(reference1) : undefined
        const plainTitle2 = reference2 ? blocksToText(reference2) : undefined
        const plainTitle3 = reference3 ? blocksToText(reference3) : undefined
        const hasMoreReferences = Boolean(plainTitle3)
        const titleText = [plainTitle1, plainTitle2].filter(Boolean).join(', ') || ''
        title = hasMoreReferences ? `${titleText}...` : titleText
      } else {
        const tags = [getTagTitle(tags1), getTagTitle(tags2), getTagTitle(tags3)].filter(Boolean)
        const hasMoreTags = Boolean(getTagTitle(tags4))
        const titleText =
          tags.length > 0
            ? `Tags: ${tags.join(', ')}`
            : `Showing ${pastEventsCount || 'all'} ${promotePastEvents ? 'past' : 'future'} events without tag filters`
        title = hasMoreTags ? `${titleText}…` : titleText
      }
      return {
        title: title,
        subtitle: manually ? `Events promotion | Manual` : `Events promotion | Automatic`,
        media: EdsIcon(calendar_event),
      }
    },
  },
}
