import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { text_field } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import type { Rule, Block } from '@sanity/types'

export type AccordionItem = {
  _type: 'accordionItem'
  title?: string
  content?: Block[]
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
      inputComponent: CharCounterEditor,
      of: [contentType],
    },
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title = '', content }: { title: string; content: Block[] }) {
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
