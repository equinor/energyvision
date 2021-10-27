import { configureBlockContent, configureTitleBlockContent } from '../editors'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { text_field } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'
import blocksToText from '../../helpers/blocksToText'

const blockContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: true,
  h4: false,
  attachment: false,
})
const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})
const titleContentType = configureTitleBlockContent()

export default {
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  fieldsets: [
    {
      title: 'Header',
      name: 'header',
    },
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'overline',
      title: 'Overline',
      type: 'string',
      fieldset: 'header',
    },
    {
      name: 'title',
      type: 'array',
      fieldset: 'header',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: SchemaType.ValidationRule) => Rule.required().warning('Should we warn for missing title'),
    },
    {
      name: 'ingress',
      title: 'Ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
    {
      name: 'text',
      title: 'Text content',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [blockContentType],
    },
    {
      name: 'action',
      type: 'array',
      title: 'Call to action',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
    },
    {
      title: 'Background',
      description: 'Pick a colour for the background. Default is white.',
      name: 'background',
      type: 'colorlist',
      options: {
        borderradius: {
          outer: '100%',
          inner: '100%',
        },
        tooltip: true,
        list: Colors,
      },
      fieldset: 'design',
      initialValue: Colors[0],
    },
  ],
  preview: {
    select: {
      title: 'title',
      ingress: 'ingress',
      text: 'text',
    },
    prepare({ title = [], ingress, text }: { title: any[]; ingress: any; text: any }) {
      const textBlock = (text || []).find((introBlock: any) => introBlock._type === 'block')
      const ingressBlock = (ingress || []).find((introBlock: any) => introBlock._type === 'block')
      const plainTitle = blocksToText(title)

      return {
        title:
          plainTitle ||
          (textBlock &&
            textBlock.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')) ||
          (ingressBlock &&
            ingressBlock.children
              .filter((child: any) => child._type === 'span')
              .map((span: any) => span.text)
              .join('')) ||
          'Missing content!',
        subtitle: `Text block component.`,
        media: EdsIcon(text_field),
      }
    },
  },
}
