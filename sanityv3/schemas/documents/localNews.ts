import type { Rule } from 'sanity'
import slugify from 'slugify'
import { newsSlug } from '../../../satellitesConfig'
import { formatDate } from '../../helpers/formatDate'
import { defaultLanguage } from '../../languages'
import { sanityClient } from '../../sanity.client'
import SlugInput from '../components/SlugInput/index'
import { i18n } from '../documentTranslation'

import { withSlugValidation } from '../validations/validateSlug'
import {
  content,
  heroImage,
  iframe,
  ingress,
  isLive,
  // We have asked Mette if this is relevant
  newsSlugField,
  openGraphImage,
  publishDateTime,
  relatedLinks,
  seo,
  title,
} from './news/sharedNewsFields'

export default {
  title: 'Local news',
  name: 'localNews',
  type: 'document',
  i18n,
  // @todo: restrict to correct role(s)
  // readOnly: ({ currentUser }: { currentUser: CurrentUser }) =>
  //   !currentUser.roles.find((role) => ['administrator'].includes(role.name)),
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
    isLive,
    {
      ...seo,
      fieldset: 'metadata',
    },
    {
      ...openGraphImage,
      fieldset: 'metadata',
    },
    {
      title: 'Local market tag',
      name: 'localNewsTag',
      type: 'reference',
      description: 'Select which local market this article belongs to.',
      to: [{ type: 'localNewsTag' }],
      options: {
        disableNew: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    title,
    ...publishDateTime,
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
        source: async (doc: any) => {
          // translated document ids end with _i18n__lang while base documents don't
          const lastFiveCharacters = doc._id.slice(-5)
          const translatedNews = newsSlug[lastFiveCharacters] || newsSlug[defaultLanguage.name]

          const localNewsTag = await sanityClient.fetch(`*[_id == $id && _type == 'localNewsTag'][0]`, {
            id: doc.localNewsTag._ref,
          })
          const localNewsPath = localNewsTag[lastFiveCharacters] || localNewsTag[defaultLanguage.name]

          return doc.newsSlug
            ? `/${translatedNews}/${slugify(localNewsPath, { lower: true })}/${slugify(doc.newsSlug, {
                lower: true,
              })}`
            : ''
        },
        slugify: (value: string) => value,
      }),
      description: '⚠️ Double check for typos and get it right on the first time! ⚠️',
      validation: (Rule: Rule) => Rule.required(),
    },
    heroImage,
    ingress,
    content,
    iframe,
    relatedLinks,
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      media: 'heroImage.image',
      description: 'ingress',
      publishedDate: 'publishDateTime',
    },
    prepare(selection: any) {
      const { title, media, description, publishedDate } = selection
      const date = publishedDate ? formatDate(publishedDate) : 'Ikke oppgitt'
      const ingressBlock = (description || []).find((ingressBlock: any) => ingressBlock._type === 'block')
      return {
        title,
        subtitle: `Published date: ${date}`,
        description: ingressBlock
          ? ingressBlock.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')
          : 'Missing lead',
        media,
      }
    },
  },
}
