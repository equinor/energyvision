import { ColorSelector } from '../components/ColorSelector'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'colorlist',
  title: 'Color',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'string',
    }),
  ],
  components: {
    input: ({ schemaType, ...rest }) => {
      const list = schemaType?.options?.list
      return <ColorSelector {...rest} {...(list && { list: list })} />
    },
  },
})
