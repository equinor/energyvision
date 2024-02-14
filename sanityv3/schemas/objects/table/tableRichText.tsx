import { configureBlockContent } from '../../editors'

const richTextType = configureBlockContent({
  h2: false,
  h3: false,
  externalLink: false,
  internalLink: false,
  lists: false,
  attachment: false,
  smallText: false,
  highlight: true,
})

export default {
  title: 'Rich Text',
  name: 'tableRichText',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [richTextType],
    },
  ],
}
