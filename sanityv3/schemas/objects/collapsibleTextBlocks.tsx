import { view_module } from '@equinor/eds-icons'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'
import { configureBlockContent } from '../editors'

const blockContentType = configureBlockContent({
  h2: false,
  h3: true,
  h4: true,
  attachment: false,
})

export default {
  type: 'object',
  name: 'collapsibleTextBlocks',
  title: 'Collapsible text blocks',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      type: 'array',
      name: 'blockGroup',
      title: 'List of text block',
      of: [
        {
          name: 'textBlock',
          title: 'Text block',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title heading',
              type: 'string',
              description:
                'Heading that will stay sticky until side content is scrolled by and collapse when scrolled past',
            },
            {
              name: 'content',
              title: 'Text content',
              type: 'array',
              of: [blockContentType],
            },
          ],
        },
      ],
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
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
      group: 'blockGroup',
    },
    prepare({ group }: any) {
      return {
        title: 'Collapsible and sticky textblocks',
        subtitle: `${group ? group.length : 0} textblocks`,
        media: <div>{EdsIcon(view_module)}</div>,
      }
    },
  },
}
