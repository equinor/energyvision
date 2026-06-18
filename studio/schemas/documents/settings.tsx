import { CogIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Common settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    {
      title: 'Common error pages background image',
      description: 'Will be used for 404 and 500 errors',
      name: 'backgroundImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Common settings',
      }
    },
  },
})
