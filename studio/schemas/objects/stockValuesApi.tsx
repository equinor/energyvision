import { dollar } from '@equinor/eds-icons'
import { Box, Heading, Text } from '@sanity/ui'
import { EdsIcon } from '../../icons'
import type { ColorSelectorValue } from '../components/ColorSelector'
import { defineField } from 'sanity'
import { configureBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import type { PortableTextBlock } from 'sanity'
import blocksToText from '../../helpers/blocksToText'

// eslint-disable-next-line react/display-name
const ApiDescription = () => {
  return (
    <Box>
      <Heading size={2}>How to use</Heading>
      <span style={{ display: 'block', marginTop: '25px' }}>
        <Text>
          This component will automatically display up to date Equinor stock values from the OSE and NYSE. No
          configuration is required.
        </Text>
      </span>
    </Box>
  )
}

export type StockValues = {
  _type: 'stockValuesApi'
  description: string
  background?: ColorSelectorValue
}

export default {
  title: 'Stock values',
  description: 'This component will automatically display up to date Equinor stock values from the OSE and NYSE.',
  name: 'stockValuesApi',
  type: 'object',
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [configureBlockContent({ variant: 'title' })],
      title: 'Title',
      description: 'The stock values should have a heading, but can be hidden below',
    },
    defineField({
      name: 'hideTitle',
      type: 'boolean',
      title: 'Hide title',
      description: 'Hides title, but is available for screen readers and gives an meaningful heading for the tabs list',
    }),
    {
      name: 'description',
      type: 'string',
      components: {
        input: ApiDescription,
      },
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title) ?? 'Stock values component'
      return {
        title: plainTitle,
        subtitle: 'Stock values component',
        media: EdsIcon(dollar),
      }
    },
  },
}
