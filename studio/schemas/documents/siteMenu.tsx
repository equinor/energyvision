import React from 'react'

export default {
  type: 'document',
  title: `Site menu`,
  name: `siteMenu`,
  __experimental_actions: ['update', 'publish'],
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
