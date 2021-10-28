

export default {
  type: 'document',
  name: `tagInField`,
  title: `Tag without document translation`,
  
  fields: [
   
    {
      type: 'string',
      name: 'titleEn',
      title: 'Title English',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'titleNo',
      title: 'Title Norwegian',
      validation: (Rule) => Rule.required(),
    },

  ],
}
