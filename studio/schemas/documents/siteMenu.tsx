import React from 'react'

export default {
  type: 'document',
  title: `Site menu`,
  name: `siteMenu`,
  //__experimental_actions: ['update', 'publish'],

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
