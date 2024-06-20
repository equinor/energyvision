/* eslint-disable @typescript-eslint/ban-ts-comment */
import { text_field } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule } from 'sanity'
import type { ColorSelectorValue } from '../../../components/ColorSelector'
import CompactBlockEditor from '../../../components/CompactBlockEditor'
import blocksToText from '../../../../helpers/blocksToText'
import { EdsIcon } from '../../../../icons'
import { configureBlockContent, configureTitleBlockContent } from '../../../editors'

const blockContentType = configureBlockContent({
  smallText: true,
  largeText: true,
  extraLargeText: true,
})
const titleContentType = configureTitleBlockContent({
  largeText: true,
  extraLargeText: true,
  twoXLText: true,
})

type GridTextBlock = {
  content?: string
  action?: Reference[]
  background?: ColorSelectorValue
}

export default {
  name: 'gridTextBlock',
  title: 'Grid Text block',
  type: 'object',
  fields: [
    {
      name: 'overline',
      title: 'Eyebrow',
      type: 'string',
    },
    {
      name: 'title',
      type: 'array',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
      validation: (Rule: Rule) =>
        Rule.custom((value: PortableTextBlock[]) => (!value ? 'A title is recommended' : true)).warning(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [blockContentType],
    },
    {
      title: 'Text Alignment',
      name: 'textAlignment',
      description: 'Overrides background image alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
          { title: 'Center', value: 'center' },
        ],
      },
      initialValue: 'left',
    },
    {
      name: 'action',
      title: 'Link/action',
      description: 'Select the link or downloadable file',
      type: 'array',
      of: [
        { type: 'linkSelector', title: 'Link' },
        { type: 'downloadableImage', title: 'Downloadable image' },
        { type: 'downloadableFile', title: 'Downloadable file' },
      ],
      validation: (Rule: Rule) => Rule.max(1).error('Only one action is permitted'),
    },
    {
      name: 'theme',
      type: 'themeList',
      description: 'use White text or Black text when using background image',
    },
    {
      name: 'backgroundImage',
      type: 'imageBackground',
      title: 'Background Image',
      description: '',
    },
  ].filter((e) => e),
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)

      return {
        title: plainTitle || 'Missing title/content',
        subtitle: 'Grid text block component',
        media: EdsIcon(text_field),
      }
    },
  },
}
