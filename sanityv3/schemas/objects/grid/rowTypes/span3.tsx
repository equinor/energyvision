import blocksToText from '../../../../helpers/blocksToText'
import { PortableTextBlock, Rule } from 'sanity'
import { EdsIcon } from '../../../../icons'
import { table_chart } from '@equinor/eds-icons'

export type Span3 = {
  _type: 'span3'
}

export default {
  title: 'Span 3',
  name: 'span3',
  type: 'object',
  fields: [
    {
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
      validation: (Rule: Rule) => Rule.max(1).error('Only one is permitted'),
    },
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
