//validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
import { SchemaType } from '../../types'
import { external_link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  title: 'External URL',
  type: 'object',
  name: 'externalUrl',
  fieldsets: [
    {
      name: 'label',
      title: 'Label',
      description: 'The label that the link/button should have.',
    },
  ],
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Link to',
      placeholder: 'https://www.example.com',
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule =>
        Rule.required().uri({ scheme: ['http', 'https', 'tel', 'mailto'] }),
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
      url: 'url',
    },
    prepare({ title = '', url }: { title: string; url: string }) {
      const Icon = EdsIcon(external_link)
      const subTitle = url ? `External link to ${url}` : 'External link | [Missing link]'
      return {
        title,
        media: Icon,
        subtitle: subTitle,
      }
    },
  },
}
