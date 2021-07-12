import React from 'react'
import { collection_2 } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'

export default {
  type: 'object',
  name: 'promoTileArray',
  title: 'Promo tiles',
  fields: [
    {
      type: 'array',
      name: 'group',
      description: 'Add 2 promotional tiles.',
      title: 'Promo tiles',
      of: [{ type: 'promoTile' }],
      validation: (Rule: SchemaType.ValidationRule) => Rule.required().min(2).max(2),
    },
  ],
  preview: {
    select: {
      group: 'group',
    },
    prepare({ group }: any) {
      return {
        title: group ? group[0]?.title + ' | ' + (group[1]?.title || '') : 'Missing content',
        subtitle: 'Promo tiles component',
        media: <div>{EdsIcon(collection_2)}</div>,
      }
    },
  },
}
