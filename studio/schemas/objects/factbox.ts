export default {
  name: 'factbox',
  type: 'object',
  fields: [
    { name: 'backgroundColour', type: 'backgroundColourPicker' },
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [
            { title: 'Numbered', value: 'number' },
            { title: 'Unordered', value: 'bullet' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    },
  ],
}
