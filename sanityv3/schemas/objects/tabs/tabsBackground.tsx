import { defineField, defineType } from 'sanity'
import TabsThemeSelector, { TabsThemeSelectorValue, TabTheme } from './tabsThemes'
import { PreviewProps } from 'sanity'

export function ThemePreview(props: PreviewProps) {
  //@ts-ignore: todo
  const { value, title } = props
  const color: TabsThemeSelectorValue = {
    title: title as string,
    value: parseInt(value, 10),
  }
  return (
    <>
      <TabTheme color={color} preview />
    </>
  )
}

export default {
  type: 'object',
  name: 'tabsBackground',
  fields: [
    defineField({
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
            input: (props) => {
              return <TabsThemeSelector {...props} />
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
      ].filter((e) => e),
      options: { sortable: false },
    }),
  ],
}
