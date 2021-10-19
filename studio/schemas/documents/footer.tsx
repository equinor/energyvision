import { SchemaType } from '../../types'

export default {
  type: 'document',
  title: `Footer`,
  name: `footer`,

  fields: [
    {
      title: 'Footer columns',
      name: 'footerColumns',
      type: 'array',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.length(3),
      of: [
        {
          type: 'object',
          name: 'footerColumnGroup',
          title: 'Footer column',
          fields: [
            {
              type: 'string',
              name: 'columnHeader',
              title: 'Column header',
              validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
}
