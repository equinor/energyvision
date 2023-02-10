import { calendar_event } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule, ValidationContext } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { filterByRouteEvents } from '../../../helpers/referenceFilters'
import { EdsIcon } from '../../../icons'
import { Flags } from '../../../src/lib/datasetHelpers'
import routes from '../../routes'

export type Event = {
  tags: string[]
  manuallySelectEvents: boolean
  promotedEvents: Reference[]
  promotePastEvents: boolean
  useTags: boolean
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
      name: 'useTags',
      type: 'boolean',
      title: 'Select events from tags',
      description: `Enable this to automatically pick events with selected tags`,
      initialValue: true,
      hidden: ({ parent }: { parent: Event }) => parent?.manuallySelectEvents === true,
    },
    Flags.HAS_EVENT && {
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
      hidden: ({ parent }: { parent: Event }) => parent?.manuallySelectEvents === true || parent?.useTags !== true,
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: Event }
          if (!parent.useTags || parent?.manuallySelectEvents === true) return true
          if (!value || value.length === 0) return 'You must select at least one tag'
          return true
        }).unique(),
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
      tags: 'tags',
      reference1: 'promotedEvents.0.content.title',
      reference2: 'promotedEvents.1.content.title',
      reference3: 'promotedEvents.2.content.title',
      manually: 'manuallySelectEvents',
      promotePastEvents: 'promotePastEvents',
      pastEventsCount: 'pastEventsCount',
    },
    prepare({
      tags,
      reference1,
      reference2,
      reference3,
      manually,
      promotePastEvents,
      pastEventsCount,
    }: {
      tags?: any
      reference1: PortableTextBlock[]
      reference2: PortableTextBlock[]
      reference3: PortableTextBlock[]
      manually: boolean
      pastEventsCount?: number
      promotePastEvents: boolean
    }) {
      let title
      if (manually) {
        const plainTitle1 = reference1 ? blocksToText(reference1) : undefined
        const plainTitle2 = reference2 ? blocksToText(reference2) : undefined
        const plainTitle3 = reference3 ? blocksToText(reference3) : undefined
        const hasMoreReferences = Boolean(plainTitle3)
        const titleText = [plainTitle1, plainTitle2].filter(Boolean).join(', ') || ''
        title = hasMoreReferences ? `${titleText}...` : titleText
      } else {
        const tagText = tags && tags.length > 0 ? `from ${tags.length} tag(s)` : `without tag filters`
        title = `Showing ${pastEventsCount || 'all'} ${promotePastEvents ? 'past' : 'future'} events ${tagText}`
      }
      return {
        title: title,
        subtitle: manually ? `Events promotion | Manual` : `Events promotion | Automatic`,
        media: EdsIcon(calendar_event),
      }
    },
  },
}
