import type { PortableTextBlock } from '@portabletext/react'
import { RiCalendarEventFill } from 'react-icons/ri'
import type { Reference, Rule, ValidationContext } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import { filterByRouteEvents } from '../../../helpers/referenceFilters'
import routes from '../../routes'
import {
  backgroundPosition,
  ingress,
  theme,
  title,
  viewAllLink,
  viewAllLinkLabel,
} from '../commonFields/commonFields'

export type EventPromotion = {
  _key: string
  _type: 'promoteEvents'
  tags?: string[]
  promotionType?: 'automatic' | 'manual'
  promotedEvents?: Reference[]
  promotePastEvents?: boolean
  eventsCount?: number
}

export default {
  title: 'Events promotion',
  name: 'promoteEvents',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
    {
      title: 'Set how events should be picked',
      name: 'promotionType',
      type: 'string',
      options: {
        list: [
          { title: 'Automatic', value: 'automatic' },
          { title: 'Manually', value: 'manual' },
        ],
      },
      initialValue: 'automatic',
    },
    {
      name: 'promotePastEvents',
      type: 'boolean',
      title: 'Only past events',
      description: 'Only select from past events',
      initialValue: false,
      hidden: ({ parent }: any) => parent?.promotionType === 'manual',
    },
    {
      name: 'eventsCount',
      title: 'Number of events',
      description:
        'Set this if you want to restrict the number of events to show',
      type: 'number',
      validation: (Rule: Rule) => Rule.max(50).error('Max 50'),
      hidden: ({ parent }: any) => parent?.promotionType === 'manual',
    },
    {
      title: 'Select from tags',
      name: 'tags',
      description:
        'Select specific tags if you want to promote events from a selection. Default is from all tags',
      type: 'array',
      of: [
        {
          title: 'Select the event tag(s) to promote',
          type: 'reference',
          to: [{ type: 'eventTag' }],
          options: { disableNew: true },
        },
      ],
      hidden: ({ parent }: any) => parent?.promotionType === 'manual',
    },
    {
      title: 'Selected Events',
      name: 'promotedEvents',
      description: 'Select the specific events you want to promote',
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
      hidden: ({ parent }: any) => parent?.promotionType !== 'manual',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          const { parent } = context as { parent: EventPromotion }
          if (parent?.promotionType === 'automatic') return true
          if (!value || value.length === 0)
            return 'You must select at least one event'
          return true
        }).unique(),
    },
    {
      title: 'Background image',
      description:
        'If this is used theme will be ignored and a background filter will be applied for title and ingress above',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
        collapsed: false,
      },
      hidden: ({ parent }: any) =>
        parent?.promotionType !== 'manual' && parent?.eventsCount > 1,
    },
    backgroundPosition(),
    viewAllLink,
    viewAllLinkLabel,
    theme,
  ].filter(e => e),
  /*   components: {
    preview: PromoteEventsPreview,
  }, */
  preview: {
    select: {
      title: 'title',
      tags: 'tags',
      promotedEvents: 'promotedEvents',
      promotionType: 'promotionType',
      promotePastEvents: 'promotePastEvents',
      eventsCount: 'eventsCount',
    },
    prepare({
      title,
      promotionType,
      promotePastEvents,
      eventsCount,
      tags,
      promotedEvents,
    }: {
      title?: PortableTextBlock[]
      promotionType: 'automatic' | 'manual'
      promotePastEvents?: boolean
      eventsCount?: number
      tags?: string[]
      promotedEvents?: Reference[]
    }) {
      //@ts-ignore:todo
      const plainTitle = blocksToText(title)
      let mainTitle = 'Event promotion'
      if (promotionType === 'automatic') {
        mainTitle = `${capitalizeFirstLetter(promotionType ?? '')} | ${promotePastEvents ? 'past' : ''} ${eventsCount ? `${eventsCount}` : 'all'} event(s) ${tags && tags?.length > 0 ? 'on tag(s)' : 'on all tags'}`
      }
      if (promotionType === 'manual') {
        mainTitle = `${capitalizeFirstLetter(promotionType ?? '')} | ${promotedEvents && promotedEvents?.length > 0 ? promotedEvents?.length : 'No'} event(s)`
      }

      return {
        title: plainTitle ? plainTitle : mainTitle,
        subtitle: `Event promotion${plainTitle ? `: ${mainTitle}` : ''}`,
        media: RiCalendarEventFill,
      }
    },
  },
}
