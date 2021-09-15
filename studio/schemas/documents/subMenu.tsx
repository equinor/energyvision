import { SchemaType } from '../../types'
import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { string } from 'prop-types'

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
      title: 'Top level/landing page link',
      name: 'link',
      // description: 'Add a link here if this menu item should not be a dropdown menu',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'isDisabled',
      title: 'Is disabled',
      description: `For testing purposes, it's possible to temporarily disable the menu item`,
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Menu label',
      name: 'label',
      description: 'The label that appears in the top menu bar.',
      type: 'string',
    },
    {
      name: 'isStatic',
      title: 'Is static page',
      description: `While migrating, content can be available as static pages generated from the old CMS. If this is 
      the case for this menu item, it's important to register the url in the static input field`,
      type: 'boolean',
      initialValue: false,
      fieldset: 'link',
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
      to: [{ type: 'route_en_GB' }, { type: 'route_nb_NO' }],
      options: {
        filter: ({ document }: { document: any }) => ({
          filter: `_type == $routeLang`,
          params: { routeLang: `route_${document._lang}` },
        }),
      },
      // eslint-disable-next-line
      // @ts-ignore: Djeez, typescript
      hidden: ({ parent }) => parent?.isStatic === true,
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
      // eslint-disable-next-line
      // @ts-ignore: Djeez, typescript
      hidden: ({ parent }) => parent?.isStatic === true,
    },
    {
      name: 'staticUrl',
      title: 'Static URL',
      type: 'string',
      description: `The URL for the static page. Don't add language information (no/en)`,
      placeholder: '/careers/experienced-professionals',
      fieldset: 'link',
      // eslint-disable-next-line
      // @ts-ignore: Djeez, typescript
      hidden: ({ parent }) => parent?.isStatic === false,
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
      isDisabled: 'isDisabled',
    },
    prepare(selection: any) {
      const { label, group = [], url, reference, isDisabled } = selection
      return {
        title: label || 'No label added yet',
        subtitle: reference?.en_GB?.current || url || `Menu groups: ${group.length} Is disabled: ${isDisabled}`,
        media: EdsIcon(format_line_spacing),
      }
    },
  },
}
