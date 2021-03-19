export default {
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      description: 'Alt attribute text description for image',
      options: {
        isHighlighted: true,
      },
      validation: (Rule: any) => Rule.required().error('Alt attribute is required'),
    },
  ],
}
