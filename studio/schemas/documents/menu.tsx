import { SchemaType } from '../../types'
import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

export default {
  type: 'document',
  name: 'subMenu',
  title: 'Menu item',
  fields: [
    {
      title: 'Menu label',
      name: 'label',
      description: 'The label that appears in the top menu bar.',
      type: 'string',
    },
    {
      title: 'Menu groups',
      name: 'group',
      type: 'array',
      of: [
        {
          type: 'menuGroup',
        },
      ],
      validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      label: 'label',
      group: 'group',
    },
    prepare(selection: any) {
      const { label, group = [] } = selection
      return {
        title: label || 'No label added yet',
        subtitle: `Menu groups: ${group.length}`,
        media: EdsIcon(format_line_spacing),
      }
    },
  },
}
