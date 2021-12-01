import { i18n } from '../documentTranslation'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { formatDate } from '../../helpers/formatDate'

const blockContentType = configureBlockContent()
const ingressBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

const validateIngress = (value) => {
  if (!value || value.length === 0) {
    return 'Required'
  }

  const count = value[0].children.reduce((total, current) => total + current.text.length, 0)

  if (count > 400) {
    return `Ingress cannot be longer than 400 characters. Currently ${count} characters long.`
  }

  return true
}

const validateRelatedLinksTitle = (value, context) => {
  const links = context.document.relatedLinks.links

  if (!links) return true

  if (!value && links.length > 0) {
    return 'A title for this component is required if links have been selected.'
  }

  return true
}

export default {
  title: 'News',
  type: 'document',
  name: 'news',
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
  ],
  fields: [
    {
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
      title: 'Meta information',
    },
    {
      name: 'openGraphImage',
      type: 'imageWithAlt',
      title: 'Open Graph Image',
      description: 'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => [Rule.required(), Rule.max(100).warning('Title should be max 100 characters')],
    },
    {
      title: 'Publication date and time',
      description: 'Date and time of when the article will be published',
      name: 'publishDateTime',
      type: 'datetime',
      options: {
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      description: "Adds tags to news article",
      of: [
        {
          type: 'reference',
          to: [
            {type: 'tag'},
           
          ]
        }
      ]
    },
    {
      // TODO: Figure out a way to run a slugify function before publish
      // so that users don't have to add hyphens and such themselves
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Danger zone! Be sure that you know what you're doing!",
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          if (slug && slug.current.match(/[A-Z]/g)) {
            return 'No uppercase letters are allowed'
          } else if (slug && slug.current.match(/\s+/g)) {
            return 'No spaces are allowed, use "-" instead'
          }
          return true
        }),
    },
    {
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAltAndCaption',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      description: 'Lead paragraph. Shown in article and on cards. Max 400 characters',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressBlockContentType],
      validation: (Rule) => Rule.custom((value) => validateIngress(value)),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType, { type: 'pullQuote' }, { type: 'positionedInlineImage' }, { type: 'factbox' }],
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value.length === 0) {
            return 'Required'
          }
          return true
        }),
    },
    {
      name: 'iframe',
      title: 'IFrame',
      description: 'Use this to add an iframe to this article. This could for example be a livestream, video, or map.',
      type: 'iframe',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'relatedLinks',
      title: 'More on this topic',
      description: 'Optional list of related links to this article.',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule) => Rule.custom((value, context) => validateRelatedLinksTitle(value, context)),
        },
        {
          name: 'links',
          title: 'Links and downloads',
          type: 'relatedLinks',
        },
      ],
    },
  ],
  initialValue: {
    relatedLinks: {
      _type: 'object',
      title: 'More on this topic',
      links: [],
    },
  },
  preview: {
    select: {
      title: 'title',
      media: 'heroImage.image',
      description: 'ingress',
      publishedDate: 'publishDateTime',
    },
    prepare(selection) {
      const { title, media, description, publishedDate } = selection
      const date = publishedDate ? formatDate(publishedDate) : 'Ikke oppgitt'
      const ingressBlock = (description || []).find((ingressBlock) => ingressBlock._type === 'block')
      return {
        title,
        subtitle: `Published date: ${date}`,
        description: ingressBlock
          ? ingressBlock.children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : 'Missing lead',
        media,
      }
    },
  },
}
