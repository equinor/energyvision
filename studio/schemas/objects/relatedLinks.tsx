import { SchemaType } from '../../types'

export default {
  name: 'relatedLinks',
  type: 'array',
  title: 'Related links',
  of: [
    {
      type: 'object',
      name: 'externalUrl',
      title: 'External URL',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'url', type: 'url', title: 'URL' },
      ],
    },
    {
      type: 'object',
      name: 'internalUrl',
      title: 'Internal URL / reference',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        {
          name: 'reference',
          type: 'reference',
          title: 'Link to',
          to: [
            {
              type: 'news',
            },
          ],
          options: {
            filter: ({ document: { title: title = '' } }: any): SchemaType.ReferenceFilter => ({
              filter: 'title != $title',
              params: { title: title },
            }),
          },
        },
      ],
    },
  ],
  validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationResult => Rule.unique(),
}
