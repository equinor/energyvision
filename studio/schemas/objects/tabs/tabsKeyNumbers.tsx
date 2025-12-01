import { NumberIcon } from '@sanity/icons'
import type { Rule } from 'sanity'
import { CompactBlockEditor } from '../../components/CompactBlockEditor'
import { configureBlockContent } from '../../editors'

const disclaimerContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  smallText: true,
})

export default {
  name: 'tabsKeyNumbers',
  title: 'Key Numbers',
  type: 'object',
  fields: [
    {
      name: 'keyNumberItems',
      title: 'Tab Key Number Items',
      type: 'array',
      of: [{ type: 'tabsKeyNumberItem' }],
      validation: (Rule: Rule) =>
        Rule.min(2).error('Need minimum 2 key numbers'),
    },
    {
      name: 'disclaimer',
      title: 'Disclaimer',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [disclaimerContentType],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Key numbers',
        media: NumberIcon,
      }
    },
  },
}
