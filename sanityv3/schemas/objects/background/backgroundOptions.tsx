import { defineType, defineField } from 'sanity'

export default defineType({
  type: 'object',
  name: 'backgroundOptions',

  fields: [
    defineField({
      type: 'array',
      name: 'background',
      description: 'Select what type of background you want to apply',
      title: 'Background',
      of: [
        { name: 'backgroundImage', type: 'imageBackground', title: 'Image' },
        {
          title: 'Color',
          description: 'Default is white.',
          name: 'backgroundColor',
          type: 'colorlist',
        },
      ].filter((e) => e),
      options: { sortable: false },
      validation: (Rule) => [
        Rule.custom((background) => {
          return background?.length > 1 ? 'Only 1 background item' : true
        }),
        Rule.custom((background) => {
          if (background?.[0]._type === 'backgroundImage') {
            return background[0]?.image?.asset ? true : 'Image required'
          }
          return true
        }),
      ],
    }),
  ],
})
