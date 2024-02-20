import { ThemeSelector, defaultColors } from '../components/ThemeSelector'
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
    title: defaultColors[0].title,
    value: defaultColors[0].value,
  },
  components: {
    input: (props) => {
      return <ThemeSelector {...props} />
    },
  },
})
