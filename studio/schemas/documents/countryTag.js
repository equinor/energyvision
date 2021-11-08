import { languages } from "../languages"


//takes every allowed language and makes a string field for each
const localeStrings = languages.map(lang => ({
  name: lang.name,
  type: "string",
  title: lang.title,
  validation: (Rule) => Rule.required(),
}));



export default {
  type: 'document',
  name: `countryTag`,
  title: `Country`,
  fields: [
   
   
    {
      type: 'object',
      name: 'title',
      title: 'Title',
      fields: localeStrings
    },
    {
      title: 'Key',
      name: 'key',
      type: 'slug',
      description: "This is a datapoint, no need to alter it beyond 'generate'",
      validation: (Rule) => Rule.required(),

      options: {
        source: 'title.en_GB',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             
      }
    }
  ],
  orderings: [
    {
      title: 'Title descending',
      name: 'titleDesc',
      by: [
        {field: 'title.en_GB', direction: 'desc'}
      ]
    },
    {
      title: 'Title ascending',
      name: 'titleDesc',
      by: [
        {field: 'title.en_GB', direction: 'asc'}
      ]
    },
  
    
  ],

  preview: {
    select: {
      title: 'title.en_GB',
      subtitle: 'title.nb_NO'
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: `Norwegian: ${subtitle }`
      }
    }
  }
}
