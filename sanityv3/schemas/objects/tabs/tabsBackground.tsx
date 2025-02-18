import { defineField, defineType } from 'sanity'
import TabsThemeSelector, { TabsThemeSelectorValue, TabTheme } from './tabsThemes'
import { Badge, Flex, Box } from '@sanity/ui'
import { PreviewProps } from 'sanity'

export function ThemePreview(props: PreviewProps) {
  console.log('props', props)
  const color: TabsThemeSelectorValue = {
    title: props.title as string,
    value: parseInt(props.value, 10),
  }
  return (
    <>
      <TabTheme color={color} preview />
      {/*       <Box flex={1}>{props.renderDefault(props)}</Box> */}
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
        defineType({
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
            /*             prepare({ title, value }: { title: string; value: any }) {
              console.log('value', value)
              const theme = getColorForTabTheme(value)
              console.log('theme', theme)

              return {
                title: `${title ?? 'No background selected'}`,
              }
            }, */
          },
        }),
      ].filter((e) => e),
      options: { sortable: false },

      /*             validation: (Rule) => [
        Rule.custom((background) => {
          return background?.length > 1 ? 'Only 1 background item' : true
        }),
        Rule.custom((background) => {
          if (background?.[0]._type === 'backgroundImage') {
            return background[0]?.image?.asset ? true : 'Image required'
          }
          return true
        }),
      ], */
    }),
  ],
}
