import React from 'react'

export default {
  type: 'document',
  title: `Site menu(simple)`,
  name: `simpleMenu`,
  // __experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Menu items',
      name: 'menuItems',
      type: 'array',
      of: [
        {
          type: 'simpleSubMenu',
        },
      ],
    },
  ],
}
