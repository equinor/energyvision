import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

import type { Rule, ValidationContext, Reference, SanityDocument } from '@sanity/types'
import routes from '../routes'

export type MenuLink = {
  _type: 'simpleMenuLink'
  label: string

  route?: Reference
}

export default {
  title: 'Menu link',
  name: 'simpleMenuLink',
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
        filter: ({ document }: { document: SanityDocument }) => ({
          filter: `_type == $routeLang`,
          params: { routeLang: `route_${document._lang}` },
        }),
        disableNew: true,
      },
      validation: (Rule: Rule) =>
        Rule.custom((route: Reference, context: ValidationContext) => {
          const { parent } = context as { parent: MenuLink }
          return !parent?.isStatic && route === undefined ? 'Required' : true
        }),
      hidden: ({ parent }: { parent: MenuLink }) => parent?.isStatic === true,
    },
  ],
  preview: {
    select: {
      label: 'label',
      route: 'route.slug',
    },
    prepare(selection: any) {
      const { label, route } = selection
      return {
        title: label || 'No label added yet',
        subtitle: route?.current ? 'Link selected' : 'No route selected yet',
        media: EdsIcon(link),
      }
    },
  },
}
