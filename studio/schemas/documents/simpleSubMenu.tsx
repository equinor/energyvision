import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { validateStaticUrl } from '../validations/validateStaticUrl'
import { validateInternalOrExternalUrl } from '../validations/validateInternalOrExternalUrl'
import { validateCharCounterEditor } from '../validations/validateCharCounterEditor'

import type { Rule, ValidationContext, Reference, ReferenceFilterSearchOptions } from '@sanity/types'
import routes from '../routes'

export default {
  type: 'document',
  name: 'simpleSubMenu',
  title: 'Menu item',

  fields: [
    { type: 'string', name: 'label', title: 'Label', description: 'Label for menu item' },
    {
      name: 'isStatic',
      title: 'Is static page',
      description: `While migrating, content can be available as static pages generated from the old CMS. If this is
    the case for this menu item, it's important to register the url in the static input field`,
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'reference',
      title: 'Internal link',
      description: 'Use this field to reference an internal page.',
      type: 'reference',

      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: any }
          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.url)
        }),
      to: routes,
      options: {
        filter: ({ document }: { document: any }) => ({
          filter: `_type == $routeLang`,
          params: { routeLang: `route_${document._lang}` },
        }),
        disableNew: true,
      },
      hidden: ({ parent }: { parent: any }) => parent?.isStatic === true,
    },
    {
      name: 'url',
      title: 'External URL',
      description: 'Use this field to link to an external site.',
      type: 'url',

      validation: (Rule: Rule) =>
        Rule.custom((value: any, context: ValidationContext) => {
          const { parent } = context as { parent: any }
          return validateInternalOrExternalUrl(parent?.isStatic, value, parent.reference)
        }),
      hidden: ({ parent }: { parent: any }) => parent?.isStatic === true,
    },
    {
      name: 'staticUrl',
      title: 'Static URL',
      type: 'string',
      description: `The URL for the static page. Don't add language information`,
      placeholder: '/careers/experienced-professionals',

      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          return validateStaticUrl(value, context)
        }),
      hidden: ({ parent }: { parent: any }) => parent?.isStatic === false,
    },
  ],
}
