import { text_field } from '@equinor/eds-icons'
import { defineField, type PortableTextBlock, type Rule } from 'sanity'
import { EdsIcon } from '../../../icons'
import { configureBlockContent } from '../../editors/blockContentType'
import { capitalizeFirstLetter } from '../../../helpers/formatters'

export type TabsItem = {
  _type: 'tabsItem'
  title?: string
  content?: PortableTextBlock[]
}

const titleContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
  internalLink: false,
  externalLink: false,
  lists: false,
})
const blockContentType = configureBlockContent({
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Tabs item',
  name: 'tabsItem',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error(),
    },
    {
      type: 'object',
      name: 'tabPanel',
      fields: [
        defineField({
          type: 'array',
          name: 'panel',
          description: 'Add tab panel. Select the same panel type for all tab items',
          title: 'Tab panel',
          of: [
            { name: 'tabsKeyNumbers', type: 'tabsKeyNumbers', title: 'Key numbers' },
            {
              name: 'tabsInfoPanel',
              type: 'tabsInfoPanel',
            },
          ].filter((e) => e),
          options: { sortable: false },
          validation: (Rule: Rule) => Rule.max(1).error('Only one panel needed'),
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      tabPanel: 'tabPanel',
    },
    prepare({ title = '', tabPanel }: { title: string; tabPanel?: any }) {
      const panelType = tabPanel?.panel?.[0]?._type
      return {
        title: title || 'Missing title',
        subtitle: `${capitalizeFirstLetter(panelType)}`,
        media: EdsIcon(text_field),
      }
    },
  },
}
