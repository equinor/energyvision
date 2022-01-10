import React from 'react'
import type { Rule, ValidationContext } from '@sanity/types'

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
    {
      title: 'Work in progress! Menu items',
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
          },
          initialValue: (document: any) => {
            return {
              _lang: document._lang,
            }
          },
        },
      ],
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          return true
        }).unique(),
    },
  ],
}
