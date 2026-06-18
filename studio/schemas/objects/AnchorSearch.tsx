import { Box, Heading, Text } from '@sanity/ui'
import { LuSearchCode } from 'react-icons/lu'

const Description = () => {
  return (
    <Box>
      <Heading size={2}>How to use</Heading>
      <Text style={{ margin: '1em 0' }}>
        This component compiles all AnchorLink components anchor references and
        Textblock anchor references together in a search
      </Text>
    </Box>
  )
}

export default {
  title: 'Anchor search',
  name: 'anchorSearch',
  type: 'object',

  fields: [
    {
      name: 'description',
      type: 'string',
      components: {
        input: Description,
      },
    },
    {
      name: 'label',
      type: 'string',
      title: 'Anchor search label',
    },
  ],
  preview: {
    select: {
      label: 'label',
    },
    prepare({ label }: { label: string }) {
      return {
        title: label,
        subtitle: `Anchor search component`,
        media: LuSearchCode,
      }
    },
  },
}
