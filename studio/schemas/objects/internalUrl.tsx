//validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
import { SchemaType } from '../../types'

export default {
  title: 'Internal URL / reference',
  type: 'object',
  name: 'internalUrl',

  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    {
      name: 'reference',
      type: 'reference',
      title: 'Link to',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
      to: [{ type: 'news' }, { type: 'route' }],
      options: {
        filter: ({ document: { title: title = '' } }: any): SchemaType.ReferenceFilter => ({
          filter: 'title != $title',
          params: { title: title },
        }),
      },
    },
  ],
  preview: {
    select: {
      title: 'label',
      media: 'reference.heroImage.image',
    },
    prepare({ title = '', media }: { title: string; media: any }) {
      return {
        title,
        media,
        subtitle: 'Internal URL / reference',
      }
    },
  },
}
