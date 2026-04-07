import { newsSlug } from '@energyvision/shared/satelliteConfig'
import { file } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule, ValidationContext } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { filterByRoute } from '../../helpers/referenceFilters'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors/blockContentType'
import routes from '../routes'
import { lang } from './langField'

export default {
  type: 'document',
  title: 'Newsroom',
  name: 'newsroom',
  icon: () => EdsIcon(file),
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
      of: [configureBlockContent({ variant: 'titleWithDisplay' })],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: (props: any) => {
        const { value, document } = props
        if (typeof value === 'undefined' || !value) {
          return false
        }
        if (value?.current === newsSlug[document?.lang as string]) {
          return true
        }
        return false
      },
      validation: (Rule: Rule) =>
        Rule.custom((value: { current: string }, ctx: ValidationContext) => {
          if (value?.current) {
            if (value?.current === newsSlug[ctx?.document?.lang as string]) {
              return true
            }
            return `Must be ${newsSlug[ctx?.document?.lang as string]}`
          }
          return 'Required'
        }),
    },
    {
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'imageWithAlt',
      description:
        'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      title: 'Text',
      name: 'ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'fullBlock' })],
    },
    {
      name: 'subscriptionLink',
      title: 'Link to the email subscription page',
      type: 'reference',
      to: routes,
      options: {
        filter: filterByRoute,
      },
    },
    {
      name: 'subscriptionLinkTitle',
      title: 'Title for the subscription link',
      type: 'string',
    },
    {
      title: 'List of local news pages',
      name: 'localNewsPages',
      type: 'array',
      of: [{ type: 'linkSelector', title: 'Link' }],
    },
    {
      title: 'Image thumbnail fallbacks',
      name: 'imageThumbnailFallbacks',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Fallback image',
          options: {
            hotspot: true,
            collapsed: false,
          },
        },
      ],
      validation: (Rule: Rule) => Rule.max(3),
    },
  ],
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
    },
    prepare({
      title,
      ingress,
    }: {
      title: PortableTextBlock[]
      ingress: PortableTextBlock[]
    }) {
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: blocksToText(ingress) || '',
      }
    },
  },
}
