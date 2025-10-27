import CompactBlockEditor from '../../components/CompactBlockEditor'
import { AiOutlineBarChart } from 'react-icons/ai'
import { configureBlockContent } from '../../editors'
import { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'

export default {
  title: 'Bar chart',
  name: 'barChartBlock',
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
      type: 'barChart',
      title: 'Bar chart',
      name: 'chartData',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title?: PortableTextBlock[] }) {
      const plainTitle = title ? blocksToText(title) : 'Bar Chart'

      return {
        title: plainTitle,
        subtitle: 'Bar chart component',
        media: AiOutlineBarChart,
      }
    },
  },
}
