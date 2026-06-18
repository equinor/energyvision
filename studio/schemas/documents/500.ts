import { collection_5, flight_land } from '@equinor/eds-icons'
import type { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors/blockContentType'
import { lang } from './langField'

export default {
  type: 'document',
  title: `500 page`,
  name: `internalServerError`,
  icon: () => EdsIcon(collection_5),
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
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      description: `Don't add the status code (500). The web will take care of that`,
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [configureBlockContent({ variant: 'withH2SimpleBlock' })],
    },
    {
      title: 'Background image',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: PortableTextBlock[] }) {
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: 'Internal server error',
        media: EdsIcon(flight_land),
      }
    },
  },
}
