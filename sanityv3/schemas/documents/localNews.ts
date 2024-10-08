import { file_description } from '@equinor/eds-icons'
import {
  Rule,
  SanityDocument,
  SlugSchemaType,
  SlugSourceContext,
  SlugParent as DefaultSlugParent,
  Reference,
  SanityClient,
} from 'sanity'
import slugify from 'slugify'
import { newsSlug } from '../../../satellitesConfig'
import { formatDate } from '../../helpers/formatDate'
import { EdsIcon } from '../../icons'
import { defaultLanguage } from '../../languages'
import SlugInput from '../components/SlugInput'
import { withSlugValidation } from '../validations/validateSlug'
import { lang } from './langField'
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
  excludeFromSearch,
} from './news/sharedNewsFields'

type SlugParent = {
  lang: string
  localNewsTag: Reference
} & DefaultSlugParent

export default {
  title: 'Local news',
  name: 'localNews',
  type: 'document',
  icon: () => EdsIcon(file_description),
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
    lang,
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
        source: (doc: SanityDocument) => {
          return doc.newsSlug
            ? `${slugify(doc.newsSlug as string, {
                lower: true,
              })}`
            : ''
        },
        slugify: async (
          input: string,
          _schemaType: SlugSchemaType,
          context: SlugSourceContext & { client: SanityClient },
        ) => {
          const slug = slugify(input)
          const { client, parent } = context
          const document = parent as SlugParent
          const query = /* groq */ `*[_id == $id && _type == "localNewsTag"][0]`
          const params = { id: document.localNewsTag._ref }
          return client.fetch(query, params).then((localNewsTag: SanityDocument) => {
            const translatedNews = document.lang ? `/${newsSlug[document.lang]}` : `/${newsSlug[defaultLanguage.name]}`
            const localNewsPath = document.lang
              ? (localNewsTag[document.lang] as string)
              : (localNewsTag[defaultLanguage.name] as string)
            return `${translatedNews}/${slugify(localNewsPath, { lower: true })}/${slug}`
          })
        },
      }),
      description: '⚠️ Double check for typos and get it right on the first time! ⚠️',
      validation: (Rule: Rule) => Rule.required(),
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
    prepare(selection: any) {
      const { title, media, description, publishedDate, firstPublishedAt, isCustomDate } = selection
      const currentDate = new Date()
      const date =
        publishedDate && isCustomDate ? new Date(publishedDate) : firstPublishedAt ? new Date(firstPublishedAt) : null

      const displayDate = date && date <= currentDate ? formatDate(date) : 'Not Published'

      const ingressBlock = (description || []).find((ingressBlock: any) => ingressBlock._type === 'block')
      return {
        title,
        subtitle: `Published date: ${displayDate}`,
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
