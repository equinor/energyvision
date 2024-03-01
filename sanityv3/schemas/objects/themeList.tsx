import { ThemeSelector } from '../components/ThemeSelector'
import { defaultColors } from '../defaultColors'
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
      name: 'key',
      type: 'string',
    }),
    defineField({
      name: 'dark',
      type: 'boolean',
    }),
  ],
  initialValue: {
    title: defaultColors[0].title,
    value: defaultColors[0].value,
    key: defaultColors[0].key,
    dark: defaultColors[0].dark,
  },
  components: {
    input: (props) => {
      return <ThemeSelector {...props} />
    },
  },
})
