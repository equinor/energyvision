import { i18n } from '../documentTranslation'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureTitleBlockContent, configureBlockContent } from '../editors'
import type { Rule, Slug, Block, ValidationContext } from '@sanity/types'
import type { RelatedLinksArray } from '../objects/relatedLinks'

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
      title: 'Event date',
      name: 'dateOfEvent',
      options: {
        collapsible: true,
        collapsed: true,
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
      fieldset: 'dateOfEvent',
    },
    {
      // TODO: Figure out a way to run a slugify function before publish
      // so that users don't have to add hyphens and such themselves
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Danger zone! Be sure that you know what you're doing!",
      validation: (Rule: Rule) =>
        Rule.required().custom((slug: Slug) => {
          if (slug && slug.current.match(/[A-Z]/g)) {
            return 'No uppercase letters are allowed'
          } else if (slug && slug.current.match(/\s+/g)) {
            return 'No spaces are allowed, use "-" instead'
          }
          return true
        }),
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
      of: [blockContentType],
    },
    {
      name: 'iframe',
      title: 'IFrame',
      description: 'Use this to add an iframe to this event. This could for example be a livestream, video, or map.',
      type: 'iframe',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
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
}
