import { i18n } from '../documentTranslation'

export default {
  type: 'document',
  name: `tag`,
  title: `Tag`,
  i18n,
  fields: [
   
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
  ],
}
