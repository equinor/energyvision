import React from 'react'
import type { Rule } from '@sanity/types'

export default {
  type: 'document',
  title: 'Promoted Magazine Tags',
  name: 'promotedMagazineTags',
  __experimental_actions: ['create', 'update', 'publish' /*,"delete"*/],
  fields: [
    {
      title: 'Promoted Magazine Tags',
      name: 'tags',
      description: 'Place the magazine tags in the correct order',
      type: 'array',
      of: [
        {
          title: 'Magazine Tag',
          type: 'reference',
          to: [{ type: 'magazineTag' }],
          options: {
            // Disable new since this button does not work with dynamic initial
            // values  :(
            disableNew: true,
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().min(5).max(5),
    },
  ],
  preview: {
    prepare() {
      return { title: 'Promoted Magazine Tags' }
    },
  },
}
