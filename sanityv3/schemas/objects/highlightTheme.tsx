import { ThemeSelector, themeColors } from '../components/ThemeSelector'
import { defineType, defineField } from 'sanity'
import { defaultColors } from '../defaultColors'
import { HighlightSelector } from '../components/HightlightSelector'

export default defineType({
  name: 'highlightTheme',
  title: 'Highlight theme',
  type: 'object',
  fields: [
    defineField({
      name: 'highlightColor',
      type: 'colorlist',
    }),
  ],

  initialValue: {
    title: defaultColors[0].title,
    value: defaultColors[0].value,
    key: defaultColors[0].key,
  },

  components: {
    input: (props) => {
      return <HighlightSelector {...props} />
    },
  },
})
