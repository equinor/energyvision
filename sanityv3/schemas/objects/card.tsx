/* eslint-disable react/display-name */
import { configureBlockContent } from '../editors'
import type { PortableTextBlock } from 'sanity'
import { Text, Card, Box } from '@sanity/ui'
import blocksToText from '../../helpers/blocksToText'

const CardField = (props: any) => {
  const { renderDefault } = props
  return (
    <Box>
        <Text muted size={2} align="left" style={{marginBottom: 20}}>
          If only title are used it will render only title as statement. If content below are used, both title and
          content will be rendered.
        </Text>
      <>{renderDefault(props)}</>
    </Box>
  )
}

const blockConfig = {
  h2: false,
  h3: false,
  h4: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: true,
}

const blockContentType = configureBlockContent({ ...blockConfig })

export type Card = {
  _type: 'card'
  title?: PortableTextBlock[]
  content?: PortableTextBlock[]
}

export default {
  name: 'card',
  title: 'Card',
  description: `If only title are used it will render as big title statement. 
  If content below are used, they will have regular heading and paragraph styling`,
  type: 'object',
  localize: true,
  components: {
    input: CardField,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Optional',
      of: [blockContentType],
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'content',
    },
    prepare({ title, text }: { title: PortableTextBlock[]; text: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)
      return {
        title: plainTitle || 'Missing title',
        subtitle: blocksToText(text) || '',
      }
    },
  },
}
