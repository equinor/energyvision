import { calendar_event } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule, ValidationContext } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { filterByRouteEvents } from '../../../helpers/referenceFilters'
import { EdsIcon } from '../../../icons'
import { Flags } from '../../../src/lib/datasetHelpers'
import routes from '../../routes'
import { EventPromotionInput } from '../../components/EventPromotion'

export type EventPromotion = {
  _key: string
  _type: 'promoteEvents'
  tags?: string[]
  manuallySelectEvents?: boolean
  promotedEvents?: Reference[]
  promotePastEvents?: boolean
  pastEventsCount?: number
  useTags?: boolean
}

export default {
  title: 'Events promotion',
  name: 'promoteEvents',
  type: 'object',
  components: {
    input: EventPromotionInput,
  },
  fields: [
    {
      name: 'manuallySelectEvents',
      type: 'boolean',
      title: 'Manually select events',
      initialValue: false,
    },
    {
      name: 'promotePastEvents',
      type: 'boolean',
      title: 'Select past events',
      initialValue: false,
    },
    {
      name: 'pastEventsCount',
      title: 'How many number of past events to show?',
      type: 'number',
      description: 'Leave empty to show all the past events (max limit 50).',
      validation: (Rule: Rule) => Rule.integer().positive().greaterThan(0).lessThan(50),
    },
    {
      name: 'useTags',
      type: 'boolean',
      title: 'Select events from tags',
      initialValue: true,
    },
    Flags.HAS_EVENT && {
      title: 'Tags',
      name: 'tags',
      description: 'Select the tags you want to promote events from',
      type: 'array',
      of: [
        {
          title: 'Select the event tag(s) to promote',
          type: 'reference',
          to: [{ type: 'eventTag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: EventPromotion }
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
          const { parent } = context as { parent: EventPromotion }
          if (!parent.manuallySelectEvents) return true
          if (!value || value.length === 0) return 'You must select at least one event'
          return true
        }).unique(),
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
