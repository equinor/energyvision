import blocksToText from '../../../../helpers/blocksToText'
import { PortableTextBlock, Rule } from 'sanity'
import { EdsIcon } from '../../../../icons'
import { table_chart } from '@equinor/eds-icons'
import singleItemArray from '../../singleItemArray'

export type Span3 = {
  _type: 'span3'
}

export default {
  title: 'Span 3',
  name: 'span3',
  type: 'object',
  fields: [
    singleItemArray({
      name: 'content',
      title: 'Span 3 type',
      description: 'Select one type of content for span 3 type',
      type: 'array',
      of: [
        { name: 'gridTextBlock', type: 'gridTextBlock', title: 'Text block' },
        { type: 'videoPlayer' },
        { type: 'iframe' },
        { type: 'figure' },
        { type: 'gridTeaser' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = [] }: { title: PortableTextBlock[] }) {
      const plainTitle = title.length > 0 ? blocksToText(title) : 'Span 3 type'

      return {
        title: plainTitle,
        subtitle: 'Span 3 component',
        media: () => EdsIcon(table_chart),
      }
    },
  },
}
