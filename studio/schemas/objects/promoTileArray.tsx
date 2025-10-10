import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { PortableTextBlock, Rule } from 'sanity'
import type { PromoTile } from './promoTile'
import blocksToText from '../../helpers/blocksToText'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent } from '../editors'

export type PromoTileArray = {
  _type: 'promoTileArray'
  group: PromoTile[]
}

export default {
  type: 'object',
  name: 'promoTileArray',
  title: 'Promo tiles',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description: 'Hides the title, but screen readers will read title',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
    },
    {
      type: 'array',
      name: 'group',
      description: 'Add promo tiles in pairs of two (2, 4, 6...)',
      title: 'Promo tiles',
      of: [{ type: 'promoTile' }],
      validation: (Rule: Rule) => Rule.required().min(2),
    },
    {
      name: 'useHorizontalScroll',
      title: 'Use horizontal scroll',
      description: '(Deprecated)',
      type: 'boolean',
      initialValue: false,
    },
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
      group: 'group',
    },
    prepare({ group, title }: { title?: PortableTextBlock[]; group: PromoTile[] }) {
      const compTitle = title ? blocksToText(title) : undefined

      const getGroupTitle = (promoTile: PromoTile) => {
        return promoTile.linkLabelAsTitle ? promoTile.link?.label : blocksToText(promoTile.title as PortableTextBlock[])
      }
      return {
        title: compTitle
          ? compTitle
          : group
            ? getGroupTitle(group[0]) + ' | ' + (getGroupTitle(group[1]) || '')
            : 'Missing content',
        subtitle: 'Promo tiles component',
        media: <div>{EdsIcon(collection_2)}</div>,
      }
    },
  },
}
