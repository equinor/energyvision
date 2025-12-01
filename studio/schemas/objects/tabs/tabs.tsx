/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Flex, Stack, Text } from '@sanity/ui'
import { defineField, defineType, type PreviewProps, type Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { capitalizeFirstLetter } from '../../../helpers/formatters'
import type { ColorSelectorValue } from '../../components/ColorSelector'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import {
  CardTheme,
  type ThemeSelectorValue,
} from '../../components/ThemeSelector'
import { configureBlockContent } from '../../editors/blockContentType'
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
      <CardTheme
        getColorForThemeHandler={getColorForTabTheme}
        color={color}
        preview
        thumbnail
      />
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
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) =>
        Rule.required().warning('Should we warn for missing title'),
    }),
    defineField({
      name: 'hideTitle',
      type: 'boolean',
      title: 'Hide title',
      description:
        'Hides title, but is available for screen readers and gives an meaningful heading for the tabs list',
    }),
    defineField({
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
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
  ].filter(e => e),
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
