import type { Rule } from '@sanity/types'
import { defaultLanguage } from '../../languages'

export default {
  title: 'Horizontal Magazine Bar',
  name: 'magazineTagBar',
  type: 'object',
  fields: [
    {
      title: 'Magazine tags',
      name: 'magazineTags',
      type: 'array',
      description: 'Add 5 tags to promote in the horizontal bar',
      of: [
        {
          type: 'reference',
          to: [{ type: 'magazineTag' }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule: Rule) => Rule.required().max(5).min(5).unique(),
    },
  ],
  preview: {
    select: {
      tag1: `magazineTags.0.title.${defaultLanguage.name}`,
      tag2: `magazineTags.1.title.${defaultLanguage.name}`,
      tag3: `magazineTags.2.title.${defaultLanguage.name}`,
      tag4: `magazineTags.3.title.${defaultLanguage.name}`,
      tag5: `magazineTags.4.title.${defaultLanguage.name}`,
    },
    prepare(selection: Record<string, any>) {
      const { tag1, tag2, tag3, tag4, tag5 } = selection
      return {
        title: `${tag1} | ${tag2} | ${tag3} | ${tag4} | ${tag5} ` || 'Missing tags',
        subtitle: `Horizontal Magazine Bar`,
      }
    },
  },
}
