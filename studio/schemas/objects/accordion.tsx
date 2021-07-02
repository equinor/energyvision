import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { text_field } from '@equinor/eds-icons'
import { AccordionComponent } from '../../icons'
import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'

const ingressContentType = configureBlockContent({
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  attachment: false,
})

export default {
  title: 'Accordion',
  name: 'accordion',
  type: 'object',
  fieldsets: [
    {
      name: 'design',
      title: 'Design options',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: SchemaType.ValidationRule) => Rule.required().warning('Should we warn for missing title'),
    },
    {
      title: 'Ingress',
      name: 'ingress',
      type: 'array',
      inputComponent: CharCounterEditor,
      of: [ingressContentType],
    },
    {
      title: 'Accordion items',
      name: 'accordion',
      type: 'array',
      of: [{ type: 'accordionItem' }],
      validation: (Rule: SchemaType.ValidationRule) => Rule.required(),
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
    },
    prepare({ title = '' }: { title: string; ingress: any }) {
      //const ingressBlock = (ingress || []).find((introBlock: any) => introBlock._type === 'block')
      return {
        title: title || 'Missing title',
        subtitle: `Accordion component.`,
        media: AccordionComponent,
      }
    },
  },
}
