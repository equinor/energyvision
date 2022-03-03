import { i18n } from '../documentTranslation'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { formatDate } from '../../helpers/formatDate'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'
import { isUniqueWithinLocale } from '../validations/isUniqueWithinLocale'
import SlugInput from '../components/SlugInput/index'

/*
import { news } from '../../../satellitesTranslations'
import languages from '../../languages'
*/

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
  smallText: false,
})

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
    {
      title: 'Slug',
      name: 'slug',
      description: '⚠️ Changing the slug after publishing it has negative impacts in the SEO ⚠️',
      options: {
        collapsible: true,
        collapsed: false,
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
      type: 'tagReference',
      description: 'Adds tags to news article',
    },
    {
      title: 'News Subscription Type',
      name: 'subscriptionType',
      type: 'string',
      description: 'This news article will be sent to all the users who subscribed to below selected type.',
      options: {
        list: [
          { title: 'General News', value: 'Company' },
          { title: 'Stock Market Announcements', value: 'Stock' },
          { title: 'Crude Oil Assays', value: 'Crude' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'newsSlug',
      title: 'News slug',
      type: 'string',
      placeholder: 'For example "Experienced professionals"',
      description: 'The unique part of the URL for this topic page. Should probably be something like the page title.',
      // validation: (Rule) => Rule.max(200),
      fieldset: 'slug',
    },
    {
      // TODO: Figure out a way to run a slugify function before publish
      // so that users don't have to add hyphens and such themselves
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'slug',
      inputComponent: SlugInput,
      options: {
        isUnique: isUniqueWithinLocale,
        source: async (doc) => {
          const docSlug = doc.newsSlug?.toLowerCase().split(' ').join('-') || ''
          return docSlug || ''

          /* @TODO: use the code below when refactoring the web part.
           * @TODO: move satellitesTranslation.ts to the dockerfile.
           */

          /*
          //translated document ids end with _i18n__lang while base documents don't
          const lastFiveCharacters = doc._id.slice(-5)
          const translatedNews = news[lastFiveCharacters] || news[languages[0].name]
          return docSlug ? `/${translatedNews}/${docSlug}` : ''
          */
        },
        slugify: (value) => value,
      },
      description: '⚠️ Double check the for typos and get it right on the first time! ⚠️',
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
      validation: (Rule) => Rule.custom((value) => validateCharCounterEditor(value, 400)),
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
      title: 'IFrame',
      name: 'iframe',
      description: 'Use this to add an iframe to this article. This could for example be a livestream, video, or map.',
      type: 'basicIframe',
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
