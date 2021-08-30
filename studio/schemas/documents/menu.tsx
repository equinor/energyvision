import { SchemaType } from '../../types'

import React from 'react'

export default (isoCode: string, title: string) => {
  return {
    type: 'document',
    title: `Menu ${title}`,
    name: `menu_${isoCode}`,
    fieldsets: [],
    fields: [
      {
        title: 'Menu items',
        name: 'group',
        type: 'array',
        of: [
          {
            type: 'subMenu',
          },
        ],
      },
    ],
  }
}
