import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'keyValue',
  title: 'KeyValue',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'string',
    }),
  ],
})
