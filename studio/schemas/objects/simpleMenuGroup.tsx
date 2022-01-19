import { list } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule } from '@sanity/types'
import type { SimpleMenuLink } from './simpleMenuLink'

export type MenuGroup = {
  _type: 'simpleMenuGroup'
  label?: string
  links?: SimpleMenuLink[]
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
