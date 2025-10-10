import blocksToText from '../../../../helpers/blocksToText'
import { PortableTextBlock, Rule } from 'sanity'
import { EdsIcon } from '../../../../icons'
import { table_chart } from '@equinor/eds-icons'

export type Span2And1 = {
  _type: 'threeColumns'
}

export default {
  title: '3 columns',
  name: 'threeColumns',
  type: 'object',
  fields: [
    {
      name: 'columns',
      title: 'List of 3 columns',
      type: 'array',
      of: [
        { name: 'gridTextBlock', type: 'gridTextBlock', title: 'Text block' },
        { type: 'figure' },
        { type: 'gridTeaser' },
      ],
      validation: (Rule: Rule) => Rule.max(3).error('Only three is permitted'),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = [] }: { title: PortableTextBlock[] }) {
      const plainTitle = title.length > 0 ? blocksToText(title) : '3 columns type'

      return {
        title: plainTitle,
        subtitle: '3 columns component',
        media: () => EdsIcon(table_chart),
      }
    },
  },
}
