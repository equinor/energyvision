import type { Rule } from '@sanity/types'

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
      validation: (Rule: Rule) => [Rule.required(), Rule.max(5), Rule.min(5), Rule.unique()],
    },
  ],
}
