import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { text_field } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  name: 'textBlock',
  title: 'Text block 🚧',
  type: 'object',
  localize: true,
  fields: [
    {
      name: 'overline',
      title: 'Overline',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [blockContentType],
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [blockContentType],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'imageWithAltAndCaption',
      collapsible: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare({ title = '', image }: { title: string; image: any }) {
      return {
        title: title,
        subtitle: `Text block component.`,
        media: image?.image || EdsIcon(text_field),
      }
    },
  },
}
