import { calendar_event, image } from '@equinor/eds-icons'
import {
  defineField,
  type PortableTextBlock,
  type Rule,
  type ValidationContext,
} from 'sanity'
import { formatDate } from '@/helpers/formatDate'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { SyncEndDayTimeInput } from '../components/SyncEndDayTimeInput'
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
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      title: 'Date information',
      description:
        'The date field is deprecated, and will eventually be removed. Please use the "Event start" and "Event end" fields instead.',
      name: 'eventDate',
      type: 'eventDate',
    },
    /*     defineField({
      type: 'object',
      name: 'startDayAndTime',
      title: 'Event start',
      fields: [
        {
          title: 'Datetime',
          description: 'See below to ignore or override time',
          name: 'dayTime',
          type: 'datetime',
          options: {
            // Enforces a specific timezone in Sanity Studio
            displayTimeZone: 'Europe/Oslo',
            // Optional: Set to false to prevent users from switching back to local browser time
            allowTimeZoneSwitch: false,
            dateFormat: 'DD-MM-YYYY',
            timeFormat: 'HH:mm',
            timeStep: 15,
          },
        },
        {
          name: 'overrideTimeLabel',
          title: 'Time label',
          description:
            'Optional if you want to override the default "To be announced" when no date is set, or write "-" if you hide time completely',
          type: 'string',
        },
      ],
    }),
    defineField({
      type: 'object',
      name: 'endDayAndTime',
      title: 'Event end',
      description: 'Optional. Will update with same date as start if set',
      fields: [
        {
          title: 'Datetime',
          description: 'See below to ignore or override time',
          name: 'dayTime',
          type: 'datetime',
          options: {
            // Enforces a specific timezone in Sanity Studio
            displayTimeZone: 'Europe/Oslo',
            // Optional: Set to false to prevent users from switching back to local browser time
            allowTimeZoneSwitch: false,
            dateFormat: 'DD-MM-YYYY',
            timeFormat: 'HH:mm',
            timeStep: 15,
          },
          components: {
            input: SyncEndDayTimeInput,
          },
        },
        {
          name: 'overrideTimeLabel',
          title: 'Time label',
          description:
            'Optional if you want to override the default "To be announced" when no date is set, or write "-" if you hide time completely',
          type: 'string',
        },
      ],
    }), */
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
      of: [configureBlockContent({ variant: 'title' })],
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
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      startDayTime: 'startDayAndTime.dayTime',
    },
    prepare({
      title,
      date,
      startDayTime,
    }: {
      title?: PortableTextBlock[]
      date?: EventDate
      startDayTime?: string
    }) {
      let eventDate = 'No date set'
      if (startDayTime) {
        eventDate = formatDate(startDayTime)
      }
      if (date?.date) {
        eventDate = date.date
      }

      return {
        title: title ? blocksToText(title) : 'Untitled event',
        subtitle: eventDate,
        media: EdsIcon(calendar_event),
      }
    },
  },
}
