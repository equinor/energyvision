import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { validateStaticUrl } from '../validations/validateStaticUrl'
import type { Rule, ValidationContext, Reference } from '@sanity/types'
import routes from '../routes'
import { filterByRoute } from '../../helpers/referenceFilters'

export type MenuLink = {
  _type: 'menuLink'
  label: string
  isStatic: boolean
  route?: Reference
  staticUrl?: string
}

export default {
  title: 'Menu link',
  name: 'menuLink',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      description: 'The visible label of the link.',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'isStatic',
      title: 'Is static page',
      description: `While migrating, content can be available as static pages generated from the old CMS. If this is
      the case for this menu item, it's important to register the url in the static input field`,
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Route',
      name: 'route',
      description: 'The content you want to appear at this path. Remember that it needs to be published first.',
      type: 'reference',
      to: routes,
      options: {
        filter: filterByRoute,
        disableNew: true,
      },
      validation: (Rule: Rule) =>
        Rule.custom((route: Reference, context: ValidationContext) => {
          const { parent } = context as { parent: MenuLink }
          return !parent?.isStatic && route === undefined ? 'Required' : true
        }),
      hidden: ({ parent }: { parent: MenuLink }) => parent?.isStatic === true,
    },
    {
      name: 'staticUrl',
      title: 'Static URL',
      type: 'string',
      description: `The URL for the static page. Don't add language information (no/en)`,
      placeholder: '/careers/experienced-professionals',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, context: ValidationContext) => {
          return validateStaticUrl(value, context)
        }),
      hidden: ({ parent }: { parent: MenuLink }) => parent?.isStatic === false,
    },
  ],
  preview: {
    select: {
      label: 'label',
      route: 'route.slug',
      isStatic: 'isStatic',
      staticUrl: 'staticUrl',
    },
    prepare(selection: any) {
      const { label, route, isStatic, staticUrl } = selection
      return {
        title: label || 'No label added yet',
        subtitle: isStatic ? `Static URL: ${staticUrl}` : route?.current || 'No route selected yet',
        media: EdsIcon(link),
      }
    },
  },
}
