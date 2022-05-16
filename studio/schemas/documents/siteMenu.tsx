import React from 'react'
import type { Rule } from '@sanity/types'
import { filterByLang } from '../../helpers/referenceFilters'
import { MenuIcon } from '../../icons'

export default {
  type: 'document',
  title: 'Site menu',
  name: 'siteMenu',
  __experimental_actions: ['create', 'update', 'publish' /*,"delete"*/],
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
            filter: filterByLang,
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
  preview: {
    prepare() {
      return { media: MenuIcon, title: 'Menu' }
    },
  },
}
