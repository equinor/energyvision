import { defineType, defineField } from 'sanity'

export default defineType({
  type: 'object',
  name: 'backgroundOption',

  fields: [
    defineField({
      title: 'Use special background',
      name: 'useSpecialBackground',
      type: 'boolean',
    }),
    defineField({
      type: 'array',
      name: 'background',
      description: 'Select what type of background you want to apply',
      title: 'Type of background',
      of: [{ type: 'imageBackground', title: 'Image Background' }].filter((e) => e),
      options: { sortable: false },
      validation: (Rule) => [
        (Rule: Rule) => Rule.required().min(1).max(1),
        Rule.required().custom((background, context) => {
          if (context.parent.useSpecialBackground) {
            return background[0]._type === 'imageBackground' && background[0]?.image?.asset ? true : 'Image required'
          }
          return true
        }),
      ],
      hidden: ({ parent }: any) => !parent?.useSpecialBackground,
    }),
  ],
})
