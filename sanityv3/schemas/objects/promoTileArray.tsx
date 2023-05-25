import React from 'react'
import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule } from 'sanity'
import type { PromoTile } from './promoTile'
import blocksToText from '../../helpers/blocksToText'
import { Flags } from '../../src/lib/datasetHelpers'

export type PromoTileArray = {
  _type: 'promoTileArray'
  group: PromoTile[]
}

export default {
  type: 'object',
  name: 'promoTileArray',
  title: 'Promo tiles',
  fields: [
    Flags.IS_DEV && {
      name: 'useHorizontalScroll',
      title: 'Use horizontal scroll',
      description:
        'When this is enabled, the promo tiles will use horizontal scroll if the amount of content is greater than the screen size allows. This feature is enabled by default for smaller screen sizes.',
      type: 'boolean',
      initialValue: false,
    },
    {
      type: 'array',
      name: 'group',
      description: 'Add promo tiles in pairs of two (2, 4, 6...)',
      title: 'Promo tiles',
      of: [{ type: 'promoTile' }],
      validation: (Rule: Rule) => Rule.required().min(2),
    },
  ].filter((e) => e),
  preview: {
    select: {
      group: 'group',
    },
    prepare({ group }: { group: PromoTile[] }) {
      const getTitle = (promoTitle: PromoTile) => {
        return blocksToText(promoTitle.title as unknown as any[])
      }
      return {
        title: group ? getTitle(group[0]) + ' | ' + (getTitle(group[1]) || '') : 'Missing content',
        subtitle: 'Promo tiles component',
        media: <div>{EdsIcon(collection_2)}</div>,
      }
    },
  },
}
