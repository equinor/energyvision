import { NumberIcon } from '@sanity/icons'
import type { Rule } from 'sanity'

export default {
  name: 'tabsKeyNumberItem',
  type: 'object',
  title: 'Tabs Key Number Item',
  fields: [
    {
      name: 'thumbnail',
      title: 'Thumbnail icon',
      description: 'Optional',
      type: 'imageWithAlt',
      hidden: ({
        currentUser,
      }: {
        currentUser: {
          roles: { name: string }[]
        }
      }) => {
        return !currentUser.roles.find(({ name }: { name: string }) =>
          ['administrator', 'designer', 'developer'].includes(name),
        )
      },
    },
    {
      name: 'keyNumber',
      title: 'Key Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'unit',
      title: 'Unit',
      description: 'A short abbreviated text describing the unit of the key number',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Short description to show below the key number',
    },
  ],

  preview: {
    select: {
      keyNumber: 'keyNumber',
      unit: 'unit',
      description: 'description',
    },
    prepare(selection: Record<string, string | number>) {
      const { keyNumber, unit, description } = selection
      return {
        title: `${keyNumber} ${unit ?? ''}`,
        subtitle: description,
        media: NumberIcon,
      }
    },
  },
}
