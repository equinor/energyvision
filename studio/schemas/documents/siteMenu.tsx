import React from 'react'

export default {
  type: 'document',
  title: `Site menu`,
  name: `siteMenu`,
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
