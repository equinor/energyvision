import { calendar_event, image } from '@equinor/eds-icons'
import {
  defineField,
  type PortableTextBlock,
  type Rule,
  type ValidationContext,
} from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'
import basicIframe from '../objects/basicIframe'
import type { EventDate } from '../objects/eventDate'
import type { RelatedLinksArray } from '../objects/relatedLinks'
import { lang } from './langField'

const validateRelatedLinksTitle = (
  value: string,
  context: ValidationContext,
) => {
  const { parent } = context as {
    parent: { title: string; links: RelatedLinksArray }
  }
  const links = parent.links

  if (!links) return true

  if (!value && links.length > 0) {
    return 'A title for this component is required if links have been selected.'
  }

  return true
}

export type EventDayAndTime = {
  _type: 'eventDayAndTime'
  dayTime: Date
  overrideTimeLabel?: string
}

export default {
  type: 'document',
  title: 'Event',
  name: 'event',
  icon: () => EdsIcon(image),
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      description:
        'This part is used for meta information when this content is used on the web',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'People and contacts',
      name: 'people',
      options: {
        collapsible: false,
        collapsed: false,
      },
    },
  ],
  fields: [
    lang,
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'titleH1' })],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      title: 'Date information',
      name: 'eventDate',
      type: 'eventDate',
      hidden: ({ value }: any) => {
        return !value
      },
    },
    defineField({
      type: 'object',
      name: 'startDayAndTime',
      title: 'Event start',
      fields: [
        {
          title: 'Date and optional time',
          description: 'Set time label below to ignore time here',
          name: 'dayTime',
          type: 'datetime',
        },
        {
          name: 'overrideTimeLabel',
          title: 'Time label',
          description:
            'Override time with e.g. "To be announced" or "-" if you dont want to show time at all',
          type: 'string',
        },
      ],
    }),
    defineField({
      type: 'object',
      name: 'endDayAndTime',
      title: 'Event end',
      description: 'Optional',
      fields: [
        {
          title: 'Date and optional time',
          description: 'Set time label below to ignore time here',
          name: 'dayTime',
          type: 'datetime',
        },
        {
          name: 'overrideTimeLabel',
          title: 'Time label',
          description:
            'Override time with e.g. "To be announced" or "-" if you dont want to show time at all',
          type: 'string',
        },
      ],
    }),
    {
      title: 'Event tags',
      name: 'eventTags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'eventTag' }],
          options: { disableNew: true },
        },
      ],
    },
    {
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      description:
        'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [configureBlockContent(), basicIframe],
    },
    {
      title: 'Title',
      name: 'promotedPeopleTitle',
      type: 'array',
      fieldset: 'people',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'titleH2' })],
    },
    {
      title: ' ',
      name: 'promotedPeople',
      type: 'promotePeople',
      fieldset: 'people',
    },
    { title: 'Contact list', type: 'contactList', name: 'contactList' },
    {
      name: 'relatedLinks',
      title: 'Links and downloads',
      description: 'Optional list of related links to this event.',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule: Rule) =>
            Rule.custom((value: string, context: ValidationContext) =>
              validateRelatedLinksTitle(value, context),
            ),
        },
        {
          name: 'links',
          title: 'Links and downloads',
          type: 'relatedLinks',
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Start date ',
      name: 'startDateAsc',
      by: [{ field: 'startDayAndTime.dayTime', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      startDayAndTime: 'startDayAndTime',
      endDayAndTime: 'endDayAndTime',
    },
    prepare({
      title,
      date,
      startDayAndTime,
      endDayAndTime,
    }: {
      title?: PortableTextBlock[]
      date?: EventDate
      startDayAndTime?: EventDayAndTime
      endDayAndTime?: EventDayAndTime
    }) {
      let eventDate = date?.date ? `${date.date}` : 'No date set'
      if (startDayAndTime) {
        if (endDayAndTime && !startDayAndTime?.overrideTimeLabel) {
          eventDate = `${startDayAndTime?.dayTime} - ${endDayAndTime?.dayTime}`
        } else {
          eventDate = startDayAndTime?.overrideTimeLabel
            ? `${startDayAndTime?.overrideTimeLabel}`
            : `${startDayAndTime?.dayTime}`
        }
      }
      return {
        title: title ? blocksToText(title) : 'Untitled event',
        subtitle: eventDate,
        media: EdsIcon(calendar_event),
      }
    },
  },
}
