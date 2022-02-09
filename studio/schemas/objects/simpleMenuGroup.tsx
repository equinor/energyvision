import { list } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'

import type { SimpleMenuLink } from './simpleMenuLink'
import type { Rule, Reference } from '@sanity/types'
import routes from '../routes'
import { filterByRoute } from '../../helpers/referenceFilters'

export type MenuGroup = {
  _type: 'simpleMenuGroup'
  label?: string
  links?: SimpleMenuLink[]
  readMoreLink?: ReadMoreLink
}
export type ReadMoreLink = {
  _type: 'readMoreLink'
  label: string
  route: Reference
}

export default {
  title: 'Menu group',
  name: 'simpleMenuGroup',
  type: 'object',
  fields: [
    {
      title: 'Group label',
      name: 'label',
      description: 'The label that appears above the links.',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Read more link',
      name: 'readMoreLink',
      type: 'object',
      fields: [
        {
          title: 'Label',
          name: 'label',
          description: 'The visible label of the link.',
          type: 'string',
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
        },
      ],
    },
    {
      title: 'Links',
      name: 'links',
      description: 'The links that appear in the group.',
      type: 'array',
      of: [
        {
          type: 'simpleMenuLink',
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      label: 'label',
      links: 'links',
    },
    prepare(selection: { label: string; links: SimpleMenuLink[] }) {
      const { label = 'Unlabeled group', links = [] } = selection
      return {
        title: label,
        subtitle: `Links: ${links.length}`,
        media: EdsIcon(list),
      }
    },
  },
}
