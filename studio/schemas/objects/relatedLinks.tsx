import { SchemaType } from '../../types'
import { external_link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

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
        {
          name: 'label',
          type: 'string',
          title: 'Label',
          validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL',
          validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: 'label',
        },
        prepare({ title = '' }: { title: string }) {
          const Icon = EdsIcon(external_link)
          return {
            title,
            media: Icon,
            subtitle: 'External URL',
          }
        },
      },
    },
    {
      type: 'object',
      name: 'internalUrl',
      title: 'Internal URL / reference',
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
    },
    { type: 'downloadableFile' },
    { type: 'downloadableImage' },
  ],
  validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationResult => Rule.unique(),
}
