import React from 'react'
import type { Reference } from '@sanity/types'

export type TagReference = {
  _type: 'tagReference'
}

export type TagReferenceArray = Reference[]

export default {
  title: 'Tags',
  name: 'tagReference',
  type: 'array',
  description: 'Adds tags to news article',
  of: [
    {
      type: 'reference',
      to: [{ type: 'tag' }, { type: 'countryTag' }],
      options: { disableNew: true },
    },
  ],
}
