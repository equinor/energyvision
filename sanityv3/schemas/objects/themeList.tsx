import { ThemeSelector } from '../components/ThemeSelector'
import { defineType, defineField } from 'sanity'
import { getColorForThemeTextTeaser, textTeaserThemeColors } from './textTeaser'

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
    title: textTeaserThemeColors[0].title,
    value: textTeaserThemeColors[0].value,
  },
  components: {
    input: (props) => {
      return (
        <ThemeSelector
          variant="circles"
          themeColors={textTeaserThemeColors}
          getColorForThemeHandler={getColorForThemeTextTeaser}
          {...props}
        />
      )
    },
  },
})
