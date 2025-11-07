import blocksToText from '../../../helpers/blocksToText'
import type { Image, PortableTextBlock, Rule } from 'sanity'
import { theme, ingress, title, layoutGrid, gridColumns, layoutDirection } from '../commonFields/commonFields'
import { externalLink } from '../linkSelector/common'
import { HiOutlineViewColumns } from 'react-icons/hi2'

export type promoteExternal = {
  _type: 'promoteExternalV2'
}

export default {
  title: 'Promote external links (v2)',
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
            ingress,
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
            prepare({ title, image }: { title: PortableTextBlock[]; image: Image }) {
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
    gridColumns,
    layoutDirection,
  ],
  preview: {
    select: {
      title: 'title',
      promoteList: 'promoteList',
      theme: 'theme',
    },
    prepare({ title, promoteList }: { title?: PortableTextBlock[]; promoteList: any[]; theme?: any }) {
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
