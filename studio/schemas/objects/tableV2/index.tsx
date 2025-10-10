import blocksToText from '../../../helpers/blocksToText'
import CompactBlockEditor from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
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

const headerCellContentType = configureBlockContent({
  variant: 'simpleBlock',
  lists: false,
  onlySubSupScriptDecorators: true,
})

const cellContentType = configureBlockContent({
  variant: 'simpleBlock',
  lists: false,
  attachment: true,
})

type TablePreviewProps = {
  theme?: TableThemeSelectorValue
  useBorder?: boolean
} & PreviewProps

export function TablePreview(props: TablePreviewProps) {
  //@ts-ignore: find import for  _type
  const { title, theme, caption, useBorder, _type } = props

  //@ts-ignore:todo
  const plainTitle = title ? blocksToText(title) : undefined
  const subTitle = `${_type === 'tablev2' ? 'Import table' : 'Table'} component | ${
    useBorder ? 'Border rows' : 'Zebra rows'
  }`

  return (
    <Flex gap={2} padding={2} align={'center'}>
      {theme && <TableTheme value={theme} preview thumbnail />}
      <Stack space={2}>
        <Text size={1}>{plainTitle ?? caption}</Text>
        <Text muted size={1}>
          {subTitle}
        </Text>
      </Stack>
    </Flex>
  )
}

export default {
  title: 'Table',
  name: 'tableV2',
  type: 'object',
  fieldsets: [
    {
      title: 'Title and ingress',
      name: 'textContent',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
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
    {
      title: 'Table series',
      name: 'series',
      description: 'Options when multiple tables are listed after each other',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a heading'),
      fieldset: 'textContent',
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      of: [configureBlockContent({ variant: 'ingress' })],
      fieldset: 'textContent',
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
              title:
                'Format all cells under this column as date object. Cell text must follow either dd/MM/yyyy or yyyy-MM-dd format.',
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
                      description:
                        'If column header is set to format as date, remember to write date text as either dd/MM/yyyy or yyyy-MM-dd format.',
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

              const plainTitleOne = cellOne ? (blocksToText(cellOne.content) ?? '') : undefined
              const plainTitleTwo = cellTwo ? (blocksToText(cellTwo.content) ?? '') : undefined
              const plainTitleThree = cellThree ? (blocksToText(cellThree.content) ?? '') : undefined
              const plainTitleFour = cellFour ? (blocksToText(cellFour.content) ?? '') : undefined
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
      initialValue: 'grey',
      fieldset: 'design',
    },
    {
      title: 'Use border row style',
      description: 'Default is zebra rows',
      type: 'boolean',
      name: 'useBorder',
      fieldset: 'design',
    },
    {
      title: 'Stretch to full container width',
      description: `Default Table is sized by its content, check this box to stretch it to the second outer content width. 
         If inner content width is checked below, the table will stretch to that container`,
      type: 'boolean',
      name: 'useFullContainerWidth',
      fieldset: 'design',
    },
    {
      title: 'Align with text in the inner content width',
      description:
        'Default container is second outer content width. This option sets the table in the inner content width aligned with all the text content.',
      type: 'boolean',
      name: 'useInnerContentWidth',
      fieldset: 'design',
    },
    {
      title: 'Reduced padding bottom',
      description:
        'This reduces padding bottom. Use this on all tables except last in the series to connect more with the next table',
      type: 'boolean',
      name: 'reducePaddingBottom',
      fieldset: 'series',
    },
    {
      title: 'No padding top',
      description:
        'This removes padding top. Use this on  all tables except first in the series to connect more with previous table.',
      type: 'boolean',
      name: 'noPaddingTop',
      fieldset: 'series',
    },
  ],
  components: {
    preview: TablePreview,
  },
  preview: {
    select: {
      title: 'title',
      caption: 'tableCaption',
      useBorder: 'useBorder',
      theme: 'theme',
    },
  },
}
