import CompactBlockEditor from '../../components/CompactBlockEditor'
import { AiOutlineBarChart } from 'react-icons/ai'
import { configureBlockContent } from '../../editors'
import { PortableTextBlock, Rule } from 'sanity'
import blocksToText from '../../../helpers/blocksToText'

export default {
  title: 'Bar chart block',
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
      name: 'charts',
      title: 'Charts',
      type: 'array',
      of: [
        {
          type: 'barChart',
          title: 'Bar chart',
        },
      ],
    },
    {
      title: 'Stretch to second outer content grid',
      type: 'boolean',
      name: 'useLayoutMd',
    },
    {
      title: 'Align with text in the inner content width',
      description: 'Text is narrower than the inner most grid, check this to align with text width',
      type: 'boolean',
      name: 'useTextWidth',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title?: PortableTextBlock[] }) {
      const plainTitle = title ? blocksToText(title) : 'Bar Chart Block'

      return {
        title: plainTitle,
        subtitle: 'Bar chart block component',
        media: AiOutlineBarChart,
      }
    },
  },
}
