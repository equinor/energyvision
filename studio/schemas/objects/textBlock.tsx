/* eslint-disable @typescript-eslint/ban-ts-comment */
import { configureBlockContent, configureTitleBlockContent } from '../editors'
import CharCounterEditor from '../components/CharCounterEditor'
import CompactBlockEditor from '../components/CompactBlockEditor'
import { text_field } from '@equinor/eds-icons'
import { EdsIcon } from '../../icons'
import { SchemaType } from '../../types'
import { Colors } from '../../helpers/ColorListValues'
import blocksToText from '../../helpers/blocksToText'
import { validateComponentAnchor } from '../validations/validateAnchorReference'
import type { Rule, Reference } from '@sanity/types'
import type { ColorListValue } from 'sanity-plugin-color-list'
import { Flags } from '../../src/lib/datasetHelpers'

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

type TextBlock = {
  overline?: string
  title?: string
  anchor?: string
  ingress?: string
  text?: string
  action?: Reference[]
  splitList?: boolean
  overrideButtonStyle?: boolean
  background?: ColorListValue
}

export default {
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  fieldsets: [
    {
      title: 'Eyebrow headline',
      name: 'eyebrow',
      description: 'A descriptive keyword, category or phrase that appears over the main headline.',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Call to action(s)',
      name: 'actions',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'design',
      title: 'Design options',
    },
    {
      name: 'anchor',
      title: 'Additional anchor point reference (Deprecated)',
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
      name: 'overline',
      title: 'Eyebrow',
      type: 'string',
      fieldset: 'eyebrow',
    },
    {
      name: 'title',
      type: 'array',
      inputComponent: CompactBlockEditor,
      of: [titleContentType],
      validation: (Rule: SchemaType.ValidationRule) => Rule.required().warning('A title is recommended'),
    },
    {
      name: 'anchor',
      type: 'anchorReferenceField',
      title: 'Anchor reference',
      validation: (Rule: Rule) =>
        [
          Rule.max(0).warning('Clear this field and use anchor link component instead.'),
          // @ts-ignore
          Rule.custom((value: string, context: any) => validateComponentAnchor(value, context)),
        ].filter((e) => e),
      fieldset: 'anchor',
      readOnly: ({ value }: { value?: string }) => !value,
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
      title: 'Links and downloads',
      fieldset: 'actions',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Call to action: Download image' },
        { type: 'downloadableFile', title: 'Call to action: Download file' },
      ],
    },
    Flags.IS_DEV && {
      title: 'Display links as two columns',
      name: 'splitList',
      type: 'boolean',
      fieldset: 'actions',
      initialValue: false,
      description:
        'You can also display links/downloads as two columns if there are alot of links.Ensure that titles are short enough to do this.',
    },
    {
      title: 'Use link style',
      name: 'overrideButtonStyle',
      type: 'boolean',
      fieldset: 'actions',
      initialValue: false,
      description:
        'You can override the default button style to link style. This can only be done if you have one link, and should be used with caution.',
      readOnly: ({ parent }: { parent: TextBlock }) => {
        return !(parent.action && parent?.action.length === 1)
      },
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
      const plainTitle = title ? blocksToText(title) : undefined

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
