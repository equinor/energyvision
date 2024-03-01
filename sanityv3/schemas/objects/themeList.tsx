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
    defineField({
      name: 'background',
      type: 'keyValue',
    }),
    defineField({
      name: 'highlight',
      type: 'keyValue',
    }),
  ],
  initialValue: {
    title: themeColors[0].title,
    value: themeColors[0].value,
    background: themeColors[0].background,
    highlight: themeColors[0].highlight,
  },
  components: {
    input: (props) => {
      return <ThemeSelector {...props} />
    },
  },
})
