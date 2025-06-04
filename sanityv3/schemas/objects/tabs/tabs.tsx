/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineField, defineType, PreviewProps, type Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureTitleBlockContent } from '../../editors'
import { configureBlockContent } from '../../editors/blockContentType'
import type { ColorSelectorValue } from '../../components/ColorSelector'
import { Flex, Stack, Text } from '@sanity/ui'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import { CardTheme, ThemeSelectorValue } from '../../components/ThemeSelector'
import { getColorForTabTheme } from './tabsThemes'

type TabsPreviewProps = {
  tabList?: any[]
  tabsBackground?: any
} & PreviewProps

export function TabsPreview(props: TabsPreviewProps) {
  const { title, tabList, tabsBackground } = props

  //@ts-ignore:todo
  const plainTitle = title ? blocksToText(title) : undefined
  const subTitle = `Tabs component | ${tabList?.length} tabs | Panel type: ${capitalizeFirstLetter(
    tabList?.[0]?.tabPanel?.panel?.[0]?._type ?? '',
  )}`

  const color: ThemeSelectorValue = {
    title: tabsBackground?.background?.[0]?.title as string,
    value: tabsBackground?.background?.[0]?.value,
  }
  return (
    <Flex gap={2} padding={2} align={'center'}>
      <CardTheme getColorForThemeHandler={getColorForTabTheme} color={color} preview thumbnail />
      <Stack space={2}>
        <Text size={1}>{plainTitle}</Text>
        <Text muted size={1}>
          {subTitle}
        </Text>
      </Stack>
    </Flex>
  )
}

export type Tabs = {
  _type: 'tabs'
  title: any
  ingress?: any
  tabs: any[]
  background?: ColorSelectorValue
}

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default defineType({
  title: 'Tabs',
  name: 'tabs',
  type: 'object',
  fieldsets: [],
  fields: [
    defineField({
      name: 'title',
      type: 'array',
      title: 'Title',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('Should we warn for missing title'),
    }),
    defineField({
      name: 'hideTitle',
      type: 'boolean',
      title: 'Hide title',
      description: 'Hides title, but is available for screen readers and gives an meaningful heading for the tabs list',
    }),
    defineField({
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      of: [ingressContentType],
    }),
    defineField({
      title: 'Tabs items',
      name: 'tabList',
      type: 'array',
      of: [{ name: 'tabsItem', type: 'tabsItem' }],
      validation: (Rule: Rule) => Rule.required(),
    }),
    defineField({
      name: 'tabsBackground',
      type: 'tabsBackground',
    }),
  ].filter((e) => e),
  components: {
    preview: TabsPreview,
  },
  preview: {
    select: {
      title: 'title',
      tabsBackground: 'tabsBackground',
      tabList: 'tabList',
    },
  },
})
