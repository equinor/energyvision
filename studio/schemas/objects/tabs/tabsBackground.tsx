import { defineField, type PreviewProps } from 'sanity'
import {
  CardTheme,
  ThemeSelector,
  type ThemeSelectorValue,
} from '../../components/ThemeSelector'
import singleItemArray from '../singleItemArray'
import { getColorForTabTheme, tabsThemeColors } from './tabsThemes'

export function ThemePreview(props: PreviewProps) {
  //@ts-ignore: todo
  const { value, title } = props
  const color: ThemeSelectorValue = {
    title: title as string,
    value: parseInt(value, 10),
  }
  return (
    <CardTheme
      color={color}
      getColorForThemeHandler={getColorForTabTheme}
      preview
    />
  )
}

export default {
  type: 'object',
  name: 'tabsBackground',
  fields: [
    singleItemArray({
      type: 'array',
      name: 'background',
      description: 'Select theme for tabs',
      title: 'Theme',
      of: [
        defineField({
          name: 'colorTheme',
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
          components: {
            input: props => {
              return (
                <ThemeSelector
                  variant='cards'
                  themeColors={tabsThemeColors}
                  getColorForThemeHandler={getColorForTabTheme}
                  {...props}
                />
              )
            },
            preview: ThemePreview,
          },
          preview: {
            select: {
              title: 'title',
              value: 'value',
            },
          },
        }),
      ].filter(e => e),
      options: { sortable: false },
    }),
  ],
}
