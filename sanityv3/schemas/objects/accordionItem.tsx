import { text_field } from '@equinor/eds-icons'
import type { Block, Rule } from 'sanity'
import { EdsIcon } from '../../icons'
import CharCounterEditor from '../components/CharCounterEditor'
import { configureBlockContent } from '../editors/blockContentType'

export type AccordionItem = {
  _type: 'accordionItem'
  title?: string
  content?: PortableTextBlock[]
}

const contentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Accordion item',
  name: 'accordionItem',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error(),
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      components: {
        input: CharCounterEditor,
      },
      of: [contentType],
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title = '', content }: { title: string; content: PortableTextBlock[] }) {
      const contentBlock = (content || []).find((contentBlock: Block) => contentBlock._type === 'block')
      return {
        title: title || 'Missing title',
        subtitle:
          (contentBlock &&
            contentBlock.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')) ||
          'Missing content',
        media: EdsIcon(text_field),
      }
    },
  },
}
