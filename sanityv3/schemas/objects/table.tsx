import blocksToText from '../../helpers/blocksToText'
import { defaultColors } from '../components/ColorSelector'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { configureBlockContent, configureTitleBlockContent } from '../editors'

import { PortableTextBlock, Rule } from 'sanity'
import type { ColorSelectorValue } from '../components/ColorSelector'

export type Table = {
  _type: 'promotion'
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  background?: ColorSelectorValue
}

const titleContentType = configureTitleBlockContent()

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

const headerCellContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: false,
  smallText: false,
})
/* const tableCellContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  lists: false,
  attachment: true,
})
 */
const chosenColors = ['White', 'Moss Green', 'Moss Green Light', 'Spruce Wood', 'Mist Blue']
const backgroundColors = defaultColors.filter((color) => chosenColors.includes(color.title))
export default {
  title: 'Table',
  name: 'table',
  type: 'object',
  fieldsets: [
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
      name: 'tableHeaders',
      title: 'Table headers',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Header cell',
          fields: [
            {
              name: 'headerCell',
              type: 'array',
              of: [headerCellContentType],
            },
          ],
        },
      ],
    },
    {
      name: 'tableRows',
      title: 'Table rows',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Table row',
          fields: [
            {
              name: 'row',
              type: 'array',
              of: [
                { type: 'linkSelector', title: 'Link' },
                { type: 'downloadableFile', title: 'Downloadable file' },
                {
                  type: 'object',
                  title: 'Text Field',
                  name: 'textField',
                  fields: [{ type: 'string', name: 'text', title: 'Text' }],
                },
                {
                  type: 'object',
                  title: 'Date Field',
                  name: 'dateField',
                  fields: [
                    {
                      title: 'Date',
                      name: 'date',
                      type: 'date',
                      options: {
                        dateFormat: 'YYYY-MM-DD',
                        calendarTodayLabel: 'Today',
                      },
                    },
                  ],
                },

                {
                  type: 'object',
                  title: 'Number Field',
                  name: 'numberField',
                  fields: [
                    {
                      title: 'Number',
                      name: 'number',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              cellOne: 'row.0',
              cellTwo: 'row.1',
              cellThree: 'row.2',
              cellFour: 'row.3',
              numberOfCells: 'row.length',
            },
            prepare({
              cellOne,
              cellTwo,
              cellThree,
              cellFour,
              numberOfCells,
            }: {
              cellOne: any
              cellTwo: any
              cellThree: any
              cellFour: any
              numberOfCells: number
            }) {
              const getText = (cellContent: any) => {
                if (cellContent._type === 'linkSelector') {
                  return cellContent.label
                } else if (cellContent._type === 'downloadableFile') {
                  return cellContent.filename
                } else if (cellContent._type === 'textField') {
                  return cellContent.text
                } else if (cellContent._type === 'dateField') {
                  return cellContent.date
                }
              }

              const plainTitleOne = cellOne ? getText(cellOne) : undefined
              const plainTitleTwo = cellTwo ? getText(cellTwo) : undefined
              const plainTitleThree = cellThree ? getText(cellThree) : undefined
              const plainTitleFour = cellFour ? getText(cellFour) : undefined
              const hasMoreCells = Boolean(plainTitleFour)
              const titles = [plainTitleOne, plainTitleTwo, plainTitleThree].filter(Boolean)
              const titleTexts = titles.length > 0 ? `${titles.join(' | ')}` : ''
              const title = hasMoreCells ? `${titleTexts}...` : titleTexts
              return {
                title: title,
                subtitle: `Row with ${numberOfCells || '0'} table cells`,
              }
            },
          },
        },
      ],
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        colors: backgroundColors,
      },
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = [] }: { title: PortableTextBlock[] }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle,
        subtitle: 'Table component',
      }
    },
  },
}
