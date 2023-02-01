import slugify from 'slugify'
import { newsSlug } from '../../../satellitesConfig'
import { formatDate } from '../../helpers/formatDate'
import { defaultLanguage } from '../../languages'
import { Flags } from '../../src/lib/datasetHelpers'
import SlugInput from '../components/SlugInput/index'
import { i18n } from '../documentTranslation'
import { withSlugValidation } from '../validations/validateSlug'
import {
  content,
  countryTags,
  excludeFromSearch,
  heroImage,
  iframe,
  ingress,
  isLive,
  newsSlugField,
  openGraphImage,
  publishDateTime,
  relatedLinks,
  seo,
  subscriptionType,
  tags,
  title,
} from './news/sharedNewsFields'

export default {
  title: 'News',
  name: 'news',
  type: 'document',
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
    {
      title: 'Tags',
      name: 'tagFieldset',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    isLive,
    {
      ...seo,
      fieldset: 'metadata',
    },
    {
      ...openGraphImage,
      fieldset: 'metadata',
    },
    title,
    ...publishDateTime,
    Flags.HAS_NEWS && { ...tags, fieldset: 'tagFieldset' },
    Flags.HAS_NEWS && { ...countryTags, fieldset: 'tagFieldset' },
    Flags.HAS_NEWS_SUBSCRIPTION && subscriptionType,
    {
      ...newsSlugField,
      fieldset: 'slug',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'slug',
      components: {
        input: SlugInput,
      },
      options: withSlugValidation({
        source: async (doc) => {
          // translated document ids end with _i18n__lang while base documents don't
          const lastFiveCharacters = doc._id.slice(-5)
          const translatedNews = newsSlug[lastFiveCharacters] || newsSlug[defaultLanguage.name]
          return doc.newsSlug ? `/${translatedNews}/${slugify(doc.newsSlug, { lower: true })}` : ''
        },
        slugify: (value) => value,
      }),
      description: '⚠️ Double check for typos and get it right on the first time! ⚠️',
      validation: (Rule) => Rule.required(),
    },
    heroImage,
    ingress,
    content,
    iframe,
    relatedLinks,
    excludeFromSearch,
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      media: 'heroImage.image',
      description: 'ingress',
      publishedDate: 'publishDateTime',
      firstPublishedAt: 'firstPublishedAt',
      isCustomDate: 'customPublicationDate',
    },
    prepare(selection) {
      const { title, media, description, publishedDate, firstPublishedAt, isCustomDate } = selection
      const date =
        publishedDate && isCustomDate
          ? formatDate(publishedDate)
          : firstPublishedAt
          ? formatDate(firstPublishedAt)
          : 'Not Published'
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
