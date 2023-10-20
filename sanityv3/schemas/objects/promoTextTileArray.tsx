import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { PortableTextBlock, Rule } from 'sanity'
import type { PromoTextTile } from './promoTextTile'
import blocksToText from '../../helpers/blocksToText'

export type PromoTextTileArray = {
  _type: 'promoTextTileArray'
  group: PromoTextTile[]
}

export default {
  type: 'object',
  name: 'promoTextTileArray',
  title: 'Promo text tiles',
  fields: [
    {
      name: 'spacing',
      type: 'boolean',
      title: 'Space between other components',
      initialValue: false,
    },
    {
      type: 'array',
      name: 'group',
      description: 'Add promo tiles as one or a pair',
      title: 'Promo text tiles',
      of: [{ type: 'promoTextTile' }],
      validation: (Rule: Rule) => Rule.required().min(1).max(2),
    },
  ].filter((e) => e),
  preview: {
    select: {
      group: 'group',
    },
    prepare({ group }: { group: PromoTextTile[] }) {
      const getTitle = (promoTextTile: PromoTextTile) => {
        return promoTextTile.linkLabelAsTitle
          ? promoTextTile.link?.label
          : blocksToText(promoTextTile.title as PortableTextBlock[])
      }
      const firstTitle = group[0] ? getTitle(group[0]) : ''
      const secondTitle = group[1] ? getTitle(group[1]) : ''

      return {
        title: firstTitle + (group[1] ? ' | ' + secondTitle : ''),
        subtitle: 'Promo tiles component',
        media: <div>{EdsIcon(collection_2)}</div>,
      }
    },
  },
}
