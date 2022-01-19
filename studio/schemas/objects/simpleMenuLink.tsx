import { link } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

import type { Rule, Reference, SanityDocument } from '@sanity/types'
import routes from '../routes'

export type SimpleMenuLink = {
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
