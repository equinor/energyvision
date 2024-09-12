import blocksToText from '../../helpers/blocksToText'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureTitleBlockContent } from '../editors'
import { configureBlockContent } from '../editors/blockContentType'
import { file } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { PortableTextBlock, Rule } from 'sanity'
import { lang } from './langField'
import routes from '../routes'
import { filterByRoute } from '../../helpers/referenceFilters'

const titleContentType = configureTitleBlockContent()
const textContentType = configureBlockContent({
  h2: true,
  h3: false,
  h4: false,
  externalLink: false,
  internalLink: true,
  lists: false,
  attachment: false,
})

export default {
  type: 'document',
  title: 'Newsroom',
  name: 'newsroom',
  icon: () => EdsIcon(file),
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
    lang,
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
      description: 'You can override the hero image as the SoMe image by uploading another image here.',
      fieldset: 'metadata',
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',

      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Text',
      name: 'ingress',
      type: 'array',
      of: [textContentType],
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
    prepare({ title, ingress }: { title: PortableTextBlock[]; ingress: PortableTextBlock[] }) {
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: blocksToText(ingress) || '',
      }
    },
  },
}
