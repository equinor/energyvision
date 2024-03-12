import { ThemeSelector, themeColors } from '../components/ThemeSelector'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'themeList',
  title: 'Theme',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'number',
    }),
  ],
  initialValue: {
    title: themeColors[0].title,
    value: themeColors[0].value,
  },
  components: {
    input: (props) => {
      return <ThemeSelector {...props} />
    },
  },
})
