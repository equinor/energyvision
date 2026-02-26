import { HiOutlineViewColumns } from 'react-icons/hi2'
import type { Image, PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'
import { ingress, layoutGrid, theme, title } from '../commonFields/commonFields'
import { externalLink } from '../linkSelector/common'

import { PromotionLayoutInput } from './promoteTopicsV2'

export type promoteExternal = {
  _type: 'promoteExternalV2'
}

export default {
  title: 'Promotion v2 external links (deprecated, use promotions v2)',
  name: 'promoteExternalLinkV2',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    title,
    ingress,
    {
      name: 'promoteList',
      title: 'List of promotions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'externalLinkItem',
          title: 'Promotional external link',
          fields: [
            title,
            {
              name: 'image',
              title: 'Promotional image',
              type: 'imageWithAlt',
            },
            externalLink,
          ],
          preview: {
            select: {
              title: 'title',
              image: 'image',
            },
            prepare({
              title,
              image,
            }: {
              title: PortableTextBlock[]
              image: Image
            }) {
              const plainTitle = title ? blocksToText(title) : 'Untitled'

              return {
                title: plainTitle,
                media: image,
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
          //@ts-ignore:todo
          if (
            ctx.parent?.layoutDirection === 'row' &&
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
      const subTitle = `Promote ${promoteList && promoteList?.length > 0 ? promoteList.length : ''} topics`
      return {
        title: plainTitle,
        subtitle: subTitle,
        media: HiOutlineViewColumns,
      }
    },
  },
}
