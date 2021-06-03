//validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
import { SchemaType } from '../../types'
import { external_link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  title: 'External URL',
  type: 'object',
  name: 'externalUrl',

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
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule =>
        Rule.required().uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
    },
  ],
  preview: {
    select: {
      title: 'label',
      url: 'url',
    },
    prepare({ title = '', url }: { title: string; url: string }) {
      const Icon = EdsIcon(external_link)
      return {
        title,
        media: Icon,
        subtitle: `External URL to ${url}`,
      }
    },
  },
}
