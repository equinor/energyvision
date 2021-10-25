//validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
import { SchemaType } from '../../types'

export default {
  title: 'Internal URL / reference',
  type: 'object',
  name: 'internalUrl',
  fieldsets: [
    {
      name: 'label',
      title: 'Label',
      description: 'The label that the link/button should have.',
    },
  ],
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Link to',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
      to: [{ type: 'news' }, { type: 'route_en_GB' }, { type: 'route_nb_NO' }],
      options: {
        filter: ({ document: { title: title = '' } }: any): SchemaType.ReferenceFilter => ({
          filter: 'title != $title',
          params: { title: title },
        }),
      },
    },
    {
      name: 'label',
      type: 'string',
      title: 'Visible label',
      fieldset: 'label',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
    },
    {
      name: 'ariaLabel',
      title: '♿  Screenreader label',
      description: 'A text used for providing screen readers with additional information',
      type: 'string',
      fieldset: 'label',
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
