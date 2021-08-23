import { SchemaType } from '../../types'
import { list } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  title: 'Menu group',
  name: 'menuGroup',
  type: 'object',
  fields: [
    {
      title: 'Group label',
      name: 'label',
      description: 'The label that appears above the links.',
      type: 'string',
    },
    {
      title: 'Links',
      name: 'links',
      description: 'The links that appear in the group.',
      type: 'array',
      of: [
        {
          type: 'menuLink',
        },
      ],
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      label: 'label',
      links: 'links',
    },
    prepare(selection: any) {
      const { label, links } = selection
      return {
        title: label,
        subtitle: `Links: ${links.length}`,
        media: EdsIcon(list),
      }
    },
  },
}
