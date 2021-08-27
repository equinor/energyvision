import { SchemaType } from '../../types'

import React from 'react'

export default (isoCode: string) => {
  return {
    type: 'document',
    title: `Menu`,
    name: `menu_${isoCode}`,
    fieldsets: [],
    fields: [
      {
        name: 'title',
        title: 'Tittel',
        type: 'string',
        validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
      },
    ],
  }
}
