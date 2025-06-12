import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../../editors'
import { PortableTextBlock, PreviewProps, Rule } from 'sanity'
import type { ColorSelectorValue } from '../../components/ColorSelector'
import { Flex, Stack, Text } from '@sanity/ui'
import { TableTheme, TableThemeSelectorValue } from './tableThemes'

export type Table = {
  _type: 'table'
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  background?: ColorSelectorValue
  theme?: TableThemeSelectorValue
}

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

const headerCellContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
  smallText: false,
  onlySubSupScriptDecorators: true,
})

const cellContentType = configureBlockContent({
  h2: false,
  h3: false,
  lists: false,
  attachment: true,
  smallText: false,
  highlight: false,
})

type TablePreviewProps = {
  theme?: TableThemeSelectorValue
  useBorder?: boolean
} & PreviewProps

export function TablePreview(props: TablePreviewProps) {
  //@ts-ignore: find import for  _type
  const { title, theme, useBorder, _type } = props

  //@ts-ignore:todo
  const plainTitle = title ? blocksToText(title) : undefined
  const subTitle = `${_type === 'tablev2' ? 'Import table' : 'Table'} component | ${
    useBorder ? 'Border rows' : 'Zebra rows'
  }`

  return (
    <Flex gap={2} padding={2} align={'center'}>
      {theme && <TableTheme value={theme} preview thumbnail />}
      <Stack space={2}>
        <Text size={1}>{plainTitle}</Text>
        <Text muted size={1}>
          {subTitle}
        </Text>
      </Stack>
    </Flex>
  )
}

export default {
  title: 'Table',
  name: 'table',
  type: 'object',
  fieldsets: [
    {
      title: 'Table ',
      name: 'tableConfig',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: 'Design options',
      name: 'design',
      description: 'Some options for design',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      description: 'Will render h2',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [ingressContentType],
    },
    {
      name: 'tableCaption',
      title: 'Table caption',
      description: 'Tables should have caption, will render as caption just above table',
      type: 'string',
    },
    {
      name: 'tableHeaders',
      title: 'Table headers',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Header cell',
          name: 'headerCell',
          fields: [
            {
              name: 'headerCell',
              type: 'array',
              of: [headerCellContentType],
            },
            {
              name: 'formatAsDate',
              title: 'Format column as date',
              type: 'boolean',
            },
          ],
        },
      ],
      fieldset: 'tableConfig',
    },
    {
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          name: 'row',
          type: 'object',
          title: 'Row',
          fields: [
            {
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [
                {
                  name: 'cell',
                  type: 'object',
                  fields: [
                    {
                      name: 'content',
                      type: 'array',
                      of: [cellContentType],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }: { cells: any[] }) {
              const [cellOne, cellTwo, cellThree, cellFour] = cells
              const numberOfCells = cells.length

              const plainTitleOne = cellOne ? blocksToText(cellOne.content) ?? '' : undefined
              const plainTitleTwo = cellTwo ? blocksToText(cellTwo.content) ?? '' : undefined
              const plainTitleThree = cellThree ? blocksToText(cellThree.content) ?? '' : undefined
              const plainTitleFour = cellFour ? blocksToText(cellFour.content) ?? '' : undefined
              const hasMoreCells = Boolean(plainTitleFour)
              const titles = [plainTitleOne, plainTitleTwo, plainTitleThree].filter(Boolean)
              const titleTexts = titles.length > 0 ? `${titles.join(' | ')}` : ''
              const title = hasMoreCells ? `${titleTexts}...` : titleTexts
              return {
                title: title,
                subtitle: `Row with ${numberOfCells || '0'} cells`,
              }
            },
          },
        },
      ],
      fieldset: 'tableConfig',
    },
    {
      title: 'Theme',
      description: 'Default is grey.',
      name: 'theme',
      type: 'tableTheme',
      fieldset: 'design',
    },
    {
      title: 'Use border row style',
      description: 'Default is zebra rows',
      type: 'boolean',
      name: 'useBorder',
      fieldset: 'design',
    },
  ],
  components: {
    preview: TablePreview,
  },
  preview: {
    select: {
      title: 'title',
      useBorder: 'useBorder',
      theme: 'theme',
    },
  },
}
