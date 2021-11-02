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
  name: `tag`,
  title: `Tag`,
  fields: [
   
    {
      type: 'object',
      name: 'title',
      title: 'Title',
      fields: localeStrings
    },
  ],
  preview: {
    select: {
      title: 'title.en_GB',
      
    }
  }
}
