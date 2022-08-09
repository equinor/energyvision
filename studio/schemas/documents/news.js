import { i18n } from '../documentTranslation'
import SlugInput from '../components/SlugInput/index'
import { newsSlug } from '../../../satellitesConfig.js'
import { defaultLanguage } from '../../languages'
import slugify from 'slugify'
import { formatDate } from '../../helpers/formatDate'
import {
  isLive,
  seo,
  openGraphImage,
  title,
  publishDateTime,
  tags,
  countryTags,
  subscriptionType,
  newsSlugField,
  heroImage,
  ingress,
  content,
  iframe,
  relatedLinks,
  excludeFromSearch,
} from './news/sharedNewsFields'
import { HAS_NEWS, HAS_NEWS_SUBSCRIPTION, IS_TEST } from '../../src/lib/datasetHelpers'
import { SearchWeights } from '../searchWeights'
import { withSlugValidation } from '../validations/validateSlug'

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
    HAS_NEWS && { ...tags, fieldset: 'tagFieldset' },
    HAS_NEWS && { ...countryTags, fieldset: 'tagFieldset' },
    HAS_NEWS_SUBSCRIPTION && subscriptionType,
    {
      ...newsSlugField,
      fieldset: 'slug',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'slug',
      inputComponent: SlugInput,
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
      const date = publishedDate ? formatDate(publishedDate) : 'Ikke oppgitt'
      const date1 =
        publishedDate && isCustomDate
          ? formatDate(publishedDate)
          : firstPublishedAt
          ? formatDate(firstPublishedAt)
          : 'Ikke oppgitt'
      const ingressBlock = (description || []).find((ingressBlock) => ingressBlock._type === 'block')
      return {
        title,
        subtitle: `Published date: ${IS_TEST ? date1 : date}`,
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
  __experimental_search: [
    { weight: SearchWeights.News, path: '_type' },
    { weight: SearchWeights.News, path: 'title' },
  ],
}
