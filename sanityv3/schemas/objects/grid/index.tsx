import { PortableTextBlock } from 'sanity'
import { EdsIcon } from '../../../icons'
import { table_chart } from '@equinor/eds-icons'
import blocksToText from '../../../helpers/blocksToText'

export type Grid = {
  _type: 'grid'
}

export default {
  title: 'Grid',
  name: 'grid',
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
      name: 'gridRows',
      title: 'Grid rows',
      description: 'Add different types of rows',
      type: 'array',
      of: [
        {
          type: 'span3',
          title: 'Span 3 columns',
          name: 'span3',
        },
        {
          type: 'span2and1',
          title: 'Span 2 columns and one single column',
          name: 'span2and1',
        },
        {
          type: 'threeColumns',
          title: '3 columns',
          name: 'threeColumns',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = [] }: { title: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)
      return {
        title: plainTitle || 'Grid',
        subtitle: 'Grid component',
        media: () => EdsIcon(table_chart),
      }
    },
  },
}
