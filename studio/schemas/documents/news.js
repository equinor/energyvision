import { i18n } from '../documentTranslation'
import SlugInput from '../components/SlugInput/index'
import { newsSlug } from '../../../satellitesConfig.js'
import { defaultLanguage } from '../../languages'
import slugify from 'slugify'
import { formatDate } from '../../helpers/formatDate'
import {
  seo,
  openGraphImage,
  title,
  publishDateTime,
  tags,
  subscriptionType,
  newsSlugField,
  heroImage,
  ingress,
  content,
  iframe,
  relatedLinks,
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
  ],
  fields: [
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
    tags,
    subscriptionType,
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
      options: {
        source: async (doc) => {
          // translated document ids end with _i18n__lang while base documents don't
          const lastFiveCharacters = doc._id.slice(-5)
          const translatedNews = newsSlug[lastFiveCharacters] || newsSlug[defaultLanguage.name]
          return doc.newsSlug ? `/${translatedNews}/${slugify(doc.newsSlug, { lower: true })}` : ''
        },
        slugify: (value) => value,
      },
      description: '⚠️ Double check for typos and get it right on the first time! ⚠️',
      validation: (Rule) => Rule.required(),
    },
    heroImage,
    ingress,
    content,
    iframe,
    relatedLinks,
  ],
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
