import { i18n } from '../documentTranslation'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureTitleBlockContent, configureBlockContent } from '../editors'
import type { Rule, ValidationContext, Block } from '@sanity/types'
import type { RelatedLinksArray } from '../objects/relatedLinks'
import { calendar_event } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import blocksToText from '../../helpers/blocksToText'
import type { EventDate } from '../objects/eventDate'
import basicIframe from '../objects/basicIframe'

const titleContentType = configureTitleBlockContent()
const blockContentType = configureBlockContent()
const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

const validateRelatedLinksTitle = (value: string, context: ValidationContext) => {
  const { parent } = context as { parent: { title: string; links: RelatedLinksArray } }
  const links = parent.links

  if (!links) return true

  if (!value && links.length > 0) {
    return 'A title for this component is required if links have been selected.'
  }

  return true
}

export default {
  type: 'document',
  title: 'Event',
  name: 'event',
  i18n,
  validation: (Rule:Rule) => Rule.custom((fields:any) => {
    if (fields.iframe!= null ) return "IFrame is deprecated. Please insert iframe inside the content field."
    return true
  }).warning(),

  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata',
      description: 'This part is used for meta information when this content is used on the web',
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
      description: 'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
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
    },
    {
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType,
       basicIframe],
    },
    {
      title: 'IFrame (Deprecated)',
      name: 'iframe',
      type: 'basicIframe',
      description: 'Iframe is deprecated on event page. You can insert iframe directly in to the content field above.',
    },
    {
      title: 'Title',
      name: 'promotedPeopleTitle',
      type: 'array',
      fieldset: 'people',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
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
            Rule.custom((value: string, context: ValidationContext) => validateRelatedLinksTitle(value, context)),
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
    },
    prepare({ title, date }: { title: Block[]; date: EventDate }) {
      const eventDate = date?.date ? `${date.date} ${date?.timezone}` : 'No date set'
      return {
        title: title ? blocksToText(title) : 'Untitled event',
        subtitle: eventDate,
        media: EdsIcon(calendar_event),
      }
    },
  },
}
