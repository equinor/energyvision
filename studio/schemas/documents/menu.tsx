import { SchemaType } from '../../types'
import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

// @TODO: validation
// only allow direct link (internal/external link) if no menu groups
// only allow menu groups if no direct link (internal/external link) selected
// only allow internal or external link, not both

const validateLink = (value: any, connectedField: any): SchemaType.ValidationResult => {
  if (value && connectedField) {
    return 'Can only have a single link. Choose either an internal or external link.'
  }

  if (connectedField && !value) {
    return true
  }

  return true
}

export default {
  type: 'document',
  name: 'subMenu',
  title: 'Menu item',
  fieldsets: [
    {
      title: 'Top level link',
      name: 'link',
      description: 'Add a link here if this menu item should not be a dropdown menu',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      title: 'Menu label',
      name: 'label',
      description: 'The label that appears in the top menu bar.',
      type: 'string',
    },
    {
      name: 'reference',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',
      fieldset: 'link',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.url)
        }),
      to: [{ type: 'route' }],
    },
    {
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',
      fieldset: 'link',
      validation: (Rule: SchemaType.ValidationRule) =>
        Rule.custom((value: any, context: SchemaType.ValidationContext) => {
          return validateLink(value, context.parent.reference)
        }),
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
      // validation: (Rule: SchemaType.ValidationRule): SchemaType.ValidationRule => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      label: 'label',
      group: 'group',
      url: 'url',
      reference: 'reference.slug',
    },
    prepare(selection: any) {
      const { label, group = [], url, reference } = selection
      return {
        title: label || 'No label added yet',
        subtitle: reference?.en_GB?.current || url || `Menu groups: ${group.length}`,
        media: EdsIcon(format_line_spacing),
      }
    },
  },
}
