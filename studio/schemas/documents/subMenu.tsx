import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { validateStaticUrl } from '../validations/validateStaticUrl'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

import type { Rule, ValidationContext, Reference } from '@sanity/types'
import routes from '../routes'
import { filterByRoute, filterByRouteNewsAndTitle } from '../../helpers/referenceFilters'

export type SubMenu = {
  _type: 'subMenu'
  label: string
  isStatic: boolean
  isDisabled: boolean
  intro: any
  group?: any
  url?: string
  staticUrl?: string
  reference?: Reference
  featuredContent?: Reference
}

const introBlockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
})

export default {
  type: 'document',
  name: 'subMenu',
  title: 'Menu item',
  fieldsets: [
    {
      title: 'Top level/landing page link',
      name: 'link',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Menu label',
      name: 'label',
      description: 'The label that appears at top level in the menu',
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
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: SubMenu }
          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.url)
        }),
      to: routes,
      options: {
        filter: filterByRoute,
        disableNew: true,
      },
      hidden: ({ parent }: { parent: SubMenu }) => parent?.isStatic === true,
    },
    {
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',
      fieldset: 'link',
      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: SubMenu }
          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.reference)
        }),
      hidden: ({ parent }: { parent: SubMenu }) => parent?.isStatic === true,
    },
    {
      name: 'staticUrl',
      title: 'Static URL',
      type: 'string',
      description: `The URL for the static page. Don't add language information`,
      placeholder: '/careers/experienced-professionals',
      fieldset: 'link',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          return validateStaticUrl(value, context)
        }),
      hidden: ({ parent }: { parent: SubMenu }) => parent?.isStatic === false,
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
      validation: (Rule: Rule) => Rule.max(5),
    },
    {
      name: 'featuredContent',
      type: 'reference',
      title: 'Featured content',
      to: [{ type: 'news' }, ...routes],
      options: {
        filter: filterByRouteNewsAndTitle,
        disableNew: true,
      },
    },
    {
      name: 'intro',
      title: 'Intro text',
      description: 'A short and catchy introduction text for this menu item (max. 215 chars)',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [introBlockContentType],
      validation: (Rule: Rule) => Rule.custom((value: any) => validateCharCounterEditor(value, 215)),
    },
  ],
  preview: {
    select: {
      label: 'label',
      group: 'group',
      url: 'url',
    },
    prepare(selection: any) {
      const { label, group = [], url } = selection
      return {
        title: label || 'No label added yet',
        subtitle: url || `Menu groups: ${group.length}`,
        media: EdsIcon(format_line_spacing),
      }
    },
  },
}
