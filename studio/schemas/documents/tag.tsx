import { SchemaType } from '../../types'

export default {
  type: 'document',
  name: `tag`,
  title: `Tag`,

  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
  ],
}
