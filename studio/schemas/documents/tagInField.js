

export default {
  type: 'document',
  name: `tagInField`,
  title: `Tag in field`,
  
  fields: [
   
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title Norwegian',
      validation: (Rule) => Rule.required(),
    },

  ],
}
