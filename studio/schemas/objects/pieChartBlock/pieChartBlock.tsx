import CompactBlockEditor from '../../components/CompactBlockEditor'
import { LiaChartPieSolid } from 'react-icons/lia'
import { configureBlockContent } from '../../editors'
import { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'

export default {
  title: 'Pie chart',
  name: 'pieChartBlock',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
      validation: (Rule: Rule) => Rule.required().warning('In most cases you should add a title'),
    },
    {
      type: 'boolean',
      name: 'hideTitle',
      title: 'Hide title',
      description: 'Hides the title, but screen readers will read title',
    },
    {
      type: 'pieChart',
      title: 'Pie chart',
      name: 'chartData',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title?: PortableTextBlock[] }) {
      const plainTitle = title ? blocksToText(title) : 'Pie Chart'

      return {
        title: plainTitle,
        subtitle: 'Pie chart component',
        media: LiaChartPieSolid,
      }
    },
  },
}
