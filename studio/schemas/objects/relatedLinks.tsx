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
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'url', type: 'url', title: 'URL' },
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
          }
        },
      },
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
      preview: {
        select: {
          title: 'label',
          media: 'reference.heroImage.image',
        },
        prepare({ title = '', media }: { title: string; media: any }) {
          return {
            title,
            media,
          }
        },
      },
    },
    { type: 'downloadableFile' },
  ],
  validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationResult => Rule.unique(),
}
