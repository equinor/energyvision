import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule } from 'sanity'
import type { PromoTextTile } from './promoTextTile'

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
    prepare() {
      return {
        title: 'Promo tiles array',
        subtitle: `Promo text tile array component`,
        media: <div>{EdsIcon(collection_2)}</div>,
      }
    },
  },
}
