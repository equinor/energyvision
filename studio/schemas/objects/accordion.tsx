/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureBlockContent } from '../editors/blockContentType'
import CharCounterEditor from '../components/CharCounterEditor'
import { AccordionComponent } from '../../icons'
import { Colors } from '../../helpers/ColorListValues'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import blocksToText from '../../helpers/blocksToText'
import type { Rule } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'
import { validateComponentAnchor } from '../validations/validateAnchorReference'

export type Accordion = {
  _type: 'accordion'
  title: any
  ingress?: any
  accordion: any[]
  background: ColorListValue
}

const titleContentType = configureTitleBlockContent()
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
    {
      name: 'anchor',
      title: 'Additional anchor point reference. (Deprecated)',
      description:
        'If the anchor reference to this component is set using anchor link component, the value here will be overridden',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: Rule) => Rule.required().warning('Should we warn for missing title'),
    },
    {
      name: 'anchor',
      type: 'anchorReferenceField',
      title: 'Anchor reference',
      validation: (Rule: Rule) =>
        // @ts-ignore
        Rule.custom((value: string, context: any) => validateComponentAnchor(value, context)),
      fieldset: 'anchor',
      readOnly: true,
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
      validation: (Rule: Rule) => Rule.required(),
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
    prepare({ title = '' }: { title: any }) {
      const plainTitle = title ? blocksToText(title) : undefined

      return {
        title: plainTitle || 'Missing title',
        subtitle: `Accordion component.`,
        media: AccordionComponent,
      }
    },
  },
}
