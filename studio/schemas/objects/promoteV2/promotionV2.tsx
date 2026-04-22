import { Card, Flex, Grid, Radio, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { LuPanelBottom, LuText } from 'react-icons/lu'
import { MdImage } from 'react-icons/md'
import {
  type Image,
  type PortableTextBlock,
  type Reference,
  type Rule,
  type StringInputProps,
  set,
  type ValidationContext,
} from 'sanity'
import { capitalizeFirstLetter } from '@/helpers/formatters'
import blocksToText from '../../../helpers/blocksToText'
import {
  hideTitle,
  ingress,
  layoutGrid,
  theme,
  title,
} from '../commonFields/commonFields'
import linkSelector from '../linkSelector/linkSelector'

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
          <Card
            key={option.value}
            paddingY={2}
            paddingX={3}
            radius={2}
            shadow={1}
          >
            <Flex
              direction='row'
              align='center'
              width='100%'
              height='stretch'
              gap={2}
            >
              <Radio
                checked={value === option.value}
                name={option.value}
                id={option.value}
                onChange={handleChange}
                value={option.value}
              />
              <Flex gap={2} align='center' width='100%'>
                <Text as='label' htmlFor={option.value}>
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

export type promotionV2 = {
  _type: 'promotionV2'
  references: PromotedTopicPage[]
}

export default {
  title: 'Promotions (v2)',
  name: 'promotionsV2',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    hideTitle,
    ingress,
    {
      name: 'promoteList',
      title: 'List of promoted items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'promotedItem',
          title: 'Promoted item',
          fields: [
            linkSelector(),
            {
              name: 'image',
              title: 'Image',
              type: 'imageWithAlt',
              hidden: ({ parent }: any) => {
                return (
                  parent?.linkSelector?.link[0]?._type !== 'link' &&
                  parent?.linkSelector?.link[0]?._type !==
                    'anchorLinkReference' &&
                  parent?.linkSelector?.link[0]?._type !== 'homePageLink'
                )
              },
              validation: (Rule: Rule) =>
                Rule.custom((value: string, ctx: ValidationContext) => {
                  if (
                    //@ts-ignore: todo
                    ctx.parent?.linkSelector?.link[0]?._type === 'link' ||
                    //@ts-ignore: todo
                    ctx.parent?.linkSelector?.link[0]?._type ===
                      'anchorLinkReference'
                  ) {
                    return value ? true : 'You must add an image'
                  }
                  return true
                }),
            },
          ],
          preview: {
            select: {
              referenceNewsMagTitle: 'linkSelector.link.0.title',
              referenceNewsMedia: 'linkSelector.link.0.heroImage.image',
              referenceMagMedia: 'linkSelector.link.0.heroFigure.image',
              referenceTopicTitle: 'linkSelector.link.0.content.title',
              referenceTopicMedia:
                'linkSelector.link.0.content.heroFigure.image',
              customImage: 'image',
              link: 'link',
              label: 'linkSelector.label',
              type: 'linkSelector.link.0._type',
            },
            prepare({
              referenceNewsMagTitle,
              referenceNewsMedia,
              referenceMagMedia,
              referenceTopicTitle,
              referenceTopicMedia,
              customImage,
              link,
              label,
              type,
            }: {
              referenceNewsMagTitle?: PortableTextBlock[]
              referenceNewsMedia?: Image
              referenceMagMedia?: Image
              referenceTopicTitle?: PortableTextBlock[]
              referenceTopicMedia?: Image
              customImage?: Image
              link?: any
              label?: string
              type?: string
            }) {
              let promoType = type ?? 'not set'
              if (type === 'pageAnchor') {
                promoType = 'anchor link'
              } else if (type === 'link') {
                promoType = 'external link'
              } else if (type) {
                promoType = 'internal link '
              }
              const referenceTitle =
                referenceTopicTitle ?? referenceNewsMagTitle
              let title = label ?? 'Missing title'
              if (
                link?.[0]?._type === 'anchorLinkReference' &&
                typeof label === 'undefined'
              ) {
                title = link?.[0]?.title
              }
              if (
                link?.[0]?._type !== 'link' &&
                link?.[0]?._type !== 'anchorLinkReference' &&
                typeof label === 'undefined' &&
                referenceTitle
              ) {
                title = blocksToText(referenceTitle) ?? label ?? 'Missing title'
              }

              return {
                title: title,
                subtitle: `${capitalizeFirstLetter(promoType)}`,
                media:
                  customImage ??
                  referenceTopicMedia ??
                  referenceNewsMedia ??
                  referenceMagMedia ??
                  LuPanelBottom,
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
      description:
        'Select number of grid column. Mobile it will only be 1 column.',
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

          if (
            //@ts-ignore:todo
            ctx.parent?.layoutDirection === 'row' &&
            //@ts-ignore:todo
            ctx.parent?.layoutGrid !== 'sm'
          ) {
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
    prepare({
      title,
      promoteList,
    }: {
      title?: PortableTextBlock[]
      promoteList: any[]
      theme?: any
    }) {
      const plainTitle = title ? blocksToText(title) : 'Untitled'
      const subTitle = `${promoteList && promoteList?.length > 0 ? promoteList.length : ''} promotions (v2) `
      return {
        title: plainTitle,
        subtitle: subTitle,
        media: LuPanelBottom,
      }
    },
  },
}
