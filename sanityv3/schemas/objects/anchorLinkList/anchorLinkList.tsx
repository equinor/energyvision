/* eslint-disable @typescript-eslint/ban-ts-comment */
import { format_line_spacing } from '@equinor/eds-icons'
import { EdsIcon } from '../../../icons'

export type AnchorLinkList = {
  _type: 'anchorLinkList'
}

export default {
  title: 'List of anchor links',
  name: 'anchorLinkList',
  type: 'object',

  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'columns',
      type: 'string',
      description: 'Manually set number of columns. Defaults to even flow with set space between',
      options: {
        list: [
          { title: 'Even flow', value: 'flex' },
          { title: '3', value: '3' },
          { title: '4', value: '4' },
          { title: '5', value: '5' },
          { title: '6', value: '6' },
        ],
      },
      initalValue: 'flex',
    },
    {
      title: 'List of anchors',
      name: 'anchorList',
      type: 'array',
      of: [{ type: 'anchorLinkReference' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: string }) {
      return {
        title: title,
        subtitle: `List of anchor links component`,
        media: EdsIcon(format_line_spacing),
      }
    },
  },
}
