import blocksToText from '../../../../helpers/blocksToText'

import { PortableTextBlock, Rule } from 'sanity'
import { EdsIcon } from '../../../../icons'
import { table_chart } from '@equinor/eds-icons'

export type Span2And1 = {
  _type: 'span2and1'
}

export default {
  title: 'Span 2 and 1 column',
  name: 'span2and1',
  type: 'object',
  fields: [
    {
      name: 'span2',
      title: 'The span 2 content',
      type: 'array',
      of: [
        { name: 'gridTextBlock', type: 'gridTextBlock', title: 'Text block' },
        { type: 'videoPlayer' },
        { type: 'iframe' },
        { type: 'figure' },
      ],
      validation: (Rule: Rule) => Rule.max(1).error('Only one is permitted'),
    },
    {
      title: 'Align Span 2 on the right',
      name: 'alignSpan2Right',
      description: 'Will align the span 2 on the right side. If not selected on the left',
      type: 'boolean',
    },
    {
      name: 'singleColumn',
      title: 'The single column content',
      type: 'array',
      of: [
        { name: 'gridTextBlock', type: 'gridTextBlock', title: 'Text block' },
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
      const plainTitle = title.length > 0 ? blocksToText(title) : 'Span 2 and 1 type'

      return {
        title: plainTitle,
        subtitle: 'Span 2 and 1 component',
        media: () => EdsIcon(table_chart),
      }
    },
  },
}
