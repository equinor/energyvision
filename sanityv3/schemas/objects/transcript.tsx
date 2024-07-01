import { defineType, defineField } from 'sanity'
import { configureBlockContent } from '../editors/blockContentType'
import CompactBlockEditor from '../components/CompactBlockEditor'

const blockConfig = {
  h2: false,
  h3: false,
  h4: false,
  smallText: false,
  internalLink: false,
  externalLink: false,
  attachment: false,
  lists: true,
}

const blockContentType = configureBlockContent({ ...blockConfig })

export default {
  name: 'transcript',
  title: 'Transcript',
  type: 'object',
  fields: [
    {
      name: 'text',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [blockContentType],
    },
  ],
}
