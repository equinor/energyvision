import { i18n } from '../documentTranslation'
import { configureBlockContent } from '../editors/blockContentType'
import { configureTitleBlockContent } from '../editors'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
import { flight_land } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule, Block } from '@sanity/types'
import { filterByLang } from '../../helpers/referenceFilters'

const titleContentType = configureTitleBlockContent()
const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  type: 'document',
  title: 'Landing page',
  name: 'landingPage',
  icon: () => EdsIcon(flight_land),
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
      title: 'Meta information',
      name: 'seo',
      type: 'titleAndMeta',
      fieldset: 'metadata',
    },
    {
      name: 'openGraphImage',
      type: 'image',
      title: 'Open Graph Image',
      fieldset: 'metadata',
    },
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
    {
      title: 'Landing page content',
      name: 'tocContent',
      description: 'Reference the sub menu you want to populate this landing page with',
      type: 'reference',
      to: [{ type: 'subMenu' }],
      options: {
        filter: filterByLang,
        disableNew: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: Block[] }) {
      const plainTitle = title ? blocksToText(title) : ''

      return {
        title: plainTitle,
        subtitle: 'Landing page',
        media: EdsIcon(flight_land),
      }
    },
  },
}
