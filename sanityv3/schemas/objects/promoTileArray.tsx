import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { PortableTextBlock, Rule } from 'sanity'
import type { PromoTile } from './promoTile'
import blocksToText from '../../helpers/blocksToText'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'

export type PromoTileArray = {
  _type: 'promoTileArray'
  group: PromoTile[]
}

const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  type: 'object',
  name: 'promoTileArray',
  title: 'Promo tile list',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureTitleBlockContent()],
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
      of: [ingressContentType],
    },
    {
      name: 'promoTileVariant',
      type: 'string',
      title: 'Promo tile variant',
      options: {
        list: [
          { title: 'Left - Right', value: 'leftRight' },
          { title: 'Top - Bottom', value: 'topBottom' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    },
    {
      type: 'array',
      name: 'group',
      title: 'Promo tiles',
      of: [{ type: 'promoTile' }],
      validation: (Rule: Rule) => Rule.required().min(2),
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
