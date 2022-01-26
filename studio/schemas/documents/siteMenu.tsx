import React from 'react'
import type { Rule } from '@sanity/types'

export default {
  type: 'document',
  title: `Site menu`,
  name: `siteMenu`,
  __experimental_actions: ['update', 'publish'],

  fields: [
    {
      title: 'Menu items',
      name: 'menuGroups',
      description: 'Place the sub menus in the correct order',
      type: 'array',
      of: [
        {
          title: 'Sub menu',
          type: 'reference',
          to: [{ type: 'subMenu' }],
          options: {
            filter: ({ document }: { document: any }) => ({
              filter: `_lang == $lang`,
              params: { lang: document._lang },
            }),
            // Disable new since this button does not work with dynamic initial
            // values  :(
            disableNew: true,
          },
          // This doesn't work, it's just a dream
          /* initialValue: (document: any) => {
            return {
              _lang: document._lang,
            }
          }, */
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
    },
  ],
}
