import { Card, Flex, Grid, Radio, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import { LuText } from 'react-icons/lu'
import { MdImage } from 'react-icons/md'
import {
  type Image,
  type PortableTextBlock,
  type Reference,
  type Rule,
  type StringInputProps,
  ValidationContext,
  set,
} from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { topicPromotionFilter } from '../../../helpers/referenceFilters'
import routes from '../../routes'
import { gridColumns, layoutGrid, theme, title } from '../commonFields/commonFields'

type PromotionLayoutInputProps = {
  options: any[]
} & StringInputProps

export const PromotionLayoutInput = (props: PromotionLayoutInputProps) => {
  const { onChange, schemaType, value = '' } = props

  const handleChange = useCallback(
    (event: any) => {
      const nextValue = event.currentTarget.value
      onChange(set(nextValue))
    },
    [onChange],
  )

  return (
    <Grid columns={schemaType?.options?.list?.length} rows={1} gap={2}>
      {schemaType?.options?.list?.map((option: any) => {
        return (
          <Card key={option.value} paddingY={2} paddingX={3} radius={2} shadow={1}>
            <Flex direction="row" align="center" width="100%" height="stretch" gap={2}>
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} align="center" width="100%">
                <Text as="label" htmlFor={option.value}>
                  {option.title}
                </Text>
                <div
                  style={{
                    marginLeft: 'auto',
                    border: '1px solid lightgrey',
                    padding: '1px',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: option?.value === 'col' ? 'column' : 'row',
                  }}
                >
                  {/*@ts-ignore:todo*/}
                  <MdImage size={20} />
                  {/*@ts-ignore:todo*/}
                  <LuText size={20} />
                </div>
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Grid>
  )
}

type PromotedTopicPage = {
  _key: string
  _type: 'topics'
  ingress: PortableTextBlock[]
  reference: Reference
}

export type promoteTopics = {
  _type: 'promoteTopicsV2'
  references: PromotedTopicPage[]
}

export default {
  title: 'Promote topics (v2)',
  name: 'promoteTopicsV2',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    {
      name: 'promoteList',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'topicItem',
          title: 'Topic item',
          fields: [
            {
              title: 'Page to be promoted',
              name: 'reference',
              description: 'Select the page you want to promote',
              type: 'reference',
              to: [...routes].filter((e) => e),
              options: {
                filter: topicPromotionFilter,
                disableNew: true,
              },
            },
          ],
          preview: {
            select: {
              topicTitle: 'reference.content.title',
              topicMedia: 'reference.content.heroFigure.image',
            },
            prepare({ topicTitle, topicMedia }: { topicTitle: PortableTextBlock[]; topicMedia: Image }) {
              const plainTitle = topicTitle ? blocksToText(topicTitle) : 'Untitled'

              return {
                title: plainTitle,
                media: topicMedia,
              }
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique(),
    },
    theme,
    layoutGrid,
    {
      title: 'Number of grid columns',
      name: 'gridColumns',
      type: 'string',
      description: 'Select number of grid column. Mobile it will only be 1 column.',
      options: {
        list: [
          { title: '2', value: '2' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
        ],
      },
      initialValue: '3',
      //@ts-ignore:todo
      hidden: ({ parent }: DocumentType) => {
        return parent?.layoutGrid === 'lg'
      },
      fieldset: 'design',
      validation: (Rule: Rule) =>
        Rule.custom((value: string, ctx: ValidationContext) => {
          //@ts-ignore:todo
          if (Number(ctx.parent?.promoteList?.length) < Number(value)) {
            return 'Fewer promotions than grid columns. Please select lower grid columns'
          }
          //@ts-ignore:todo
          if (ctx.parent?.layoutDirection === 'row' && ctx.parent?.layoutGrid !== 'sm') {
            if (value === '4') {
              return 'Please use only 2 or 3 cols when using the smaller layout grids with side by side promotions'
            }
          }
          return true
        }),
    },
    {
      title: 'Layout variant',
      name: 'layoutDirection',
      type: 'string',
      description: 'Select  variant for image and content ',
      options: {
        list: [
          { title: 'Stacked', value: 'col' },
          { title: 'Side by side', value: 'row' },
        ],
        layout: 'radio',
      },
      fieldset: 'design',
      initialValue: 'col',
      components: {
        input: PromotionLayoutInput,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      promoteList: 'promoteList',
      theme: 'theme',
    },
    prepare({ title, promoteList, theme }: { title?: PortableTextBlock[]; promoteList: any[]; theme?: any }) {
      const plainTitle = title ? blocksToText(title) : 'Untitled'
      const subTitle = `Promote ${promoteList && promoteList?.length > 0 ? promoteList.length : ''} topics`
      return {
        title: plainTitle,
        subtitle: subTitle,
        media: HiOutlineViewColumns,
      }
    },
  },
}
