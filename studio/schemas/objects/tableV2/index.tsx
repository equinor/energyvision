import { MdTableRows } from 'react-icons/md'
import type { PortableTextBlock, PreviewProps, Rule } from 'sanity'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import blocksToText from '../../../helpers/blocksToText'
import type { ColorSelectorValue } from '../../components/ColorSelector'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'
import { layoutGrid } from '../commonFields/commonFields'

export type Table = {
  _type: 'table'
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  background?: ColorSelectorValue
  theme?: string
}

type TablePreviewProps = {
  theme?: string
  useBorder?: boolean
  tableCaption?: string
  title?: PortableTextBlock[]
} & PreviewProps

export function TablePreview(props: TablePreviewProps) {
  //@ts-ignore: find import for  _type
  const { title, theme, tableCaption, useBorder, _type, renderDefault } = props

  //@ts-ignore:todo
  const plainTitle = title ? blocksToText(title) : undefined
  const subTitle = `${_type === 'tablev2' ? 'Import table' : 'Table'} | ${
    useBorder ? 'Border bottom rows' : 'Zebra rows'
  }${theme ? ` | ${capitalizeFirstLetter(theme)} theme` : ''}`
  let color = '#ebebeb'
  if (theme === 'blue') {
    color = '#a8c3db'
  } else if (theme === 'green') {
    color = '#c2d4d6'
  }

  const customMedia = (
    <div
      style={{
        backgroundColor: color,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MdTableRows size={24} color='gray' />
    </div>
  )

  return renderDefault({
    ...props,
    title: plainTitle ?? tableCaption ?? 'No title or table caption',
    subtitle: subTitle,
    media: customMedia,
  })
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
      description:
        'Tables should have caption, will render as caption just above table',
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
              of: [
                configureBlockContent({
                  variant: 'onlySubSup',
                }),
              ],
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
                      of: [
                        configureBlockContent({
                          variant: 'textDecorationAndLinks',
                        }),
                      ],
                    },
                  ],
                },
              ],
              validation: (Rule: Rule) =>
                Rule.custom((value: any[]) => {
                  if (!value || value?.length < 1) {
                    return 'Must have at least 1 cell'
                  }
                  return true
                }),
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }: { cells: any[] }) {
              if (!cells || cells.length === 0) {
                return {
                  title: 'Empty Row',
                  subtitle: 'Row with 0 cells',
                }
              }

              const [cellOne, cellTwo, cellThree, cellFour] = cells
              const numberOfCells = cells.length

              const plainTitleOne = cellOne
                ? (blocksToText(cellOne.content) ?? '')
                : undefined
              const plainTitleTwo = cellTwo
                ? (blocksToText(cellTwo.content) ?? '')
                : undefined
              const plainTitleThree = cellThree
                ? (blocksToText(cellThree.content) ?? '')
                : undefined
              const plainTitleFour = cellFour
                ? (blocksToText(cellFour.content) ?? '')
                : undefined
              const hasMoreCells = Boolean(plainTitleFour)
              const titles = [
                plainTitleOne,
                plainTitleTwo,
                plainTitleThree,
              ].filter(Boolean)
              const titleTexts =
                titles.length > 0 ? `${titles.join(' | ')}` : ''
              const title = hasMoreCells ? `${titleTexts}...` : titleTexts
              return {
                title: title,
                subtitle: `Row with ${numberOfCells || '0'} cells`,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) =>
        Rule.custom((value: { cells?: any[] }[]) => {
          if (value?.length < 1) {
            return 'Must have at least 1 row'
          }
          return true
        }),
      fieldset: 'tableConfig',
    },
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      initialValue: 'grey',
      options: {
        list: [
          { title: 'Grey', value: 'grey' },
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
        ],
      },
      fieldset: 'design',
    },
    layoutGrid(
      undefined,
      'design',
      'md',
      'Optional. Default is second outer content width',
    ),
    {
      title: 'Width adjustment',
      name: 'widthAdjustment',
      type: 'string',
      description: 'Default is fit to content within selected layout grid.',
      initialValue: 'fit',
      options: {
        list: [
          { title: 'Fit to content within selected layout grid', value: 'fit' },
          {
            title: 'Stretch to full width of selected layout grid',
            value: 'full',
          },
        ],
      },
      fieldset: 'design',
    },
    {
      title: 'Border bottom/no background color row style',
      description:
        'Default is zebra style with background color on every other row.',
      type: 'boolean',
      name: 'useBorder',
      fieldset: 'design',
    },
    //Deprecated
    {
      title: 'Stretch to full container width',
      deprecated: true,
      description: `Default Table is sized by its content, check this box to stretch it to the second outer content width. 
         If inner content width is checked below, the table will stretch to that container`,
      type: 'boolean',
      name: 'useFullContainerWidth',
      fieldset: 'design',
      hidden: ({ value }: any) => {
        return !value
      },
    },
    {
      title: 'Align with text in the inner content width',
      description:
        'Default container is second outer content width. This option sets the table in the inner content width aligned with all the text content.',
      deprecated: true,
      type: 'boolean',
      name: 'useInnerContentWidth',
      fieldset: 'design',
      hidden: ({ value }: any) => {
        return !value
      },
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
      tableCaption: 'tableCaption',
      useBorder: 'useBorder',
      theme: 'theme',
    },
  },
}
