import CompactBlockEditor from '../../components/CompactBlockEditor'
import { PiChartLineLight } from 'react-icons/pi'
import { configureBlockContent } from '../../editors'
import { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'

export default {
  title: 'Line chart',
  name: 'lineChartBlock',
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
      type: 'lineChart',
      title: 'Line chart',
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
        subtitle: 'Line chart component',
        media: PiChartLineLight,
      }
    },
  },
}
