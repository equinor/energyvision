/* eslint-disable @typescript-eslint/ban-ts-comment */
import { text_field } from '@equinor/eds-icons'
import type { PortableTextBlock, Reference, Rule } from 'sanity'
import type { ColorSelectorValue } from '../../../components/ColorSelector'
import blocksToText from '../../../../helpers/blocksToText'
import { EdsIcon } from '../../../../icons'
import { configureBlockContent } from '../../../editors'

const blockContentType = configureBlockContent({
  smallText: true,
  largeText: true,
  extraLargeText: true,
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
    },
    {
      name: 'backgroundImage',
      type: 'imageBackground',
      title: 'Background Image',
      description: 'Content alignment is ignored on this',
    },
  ].filter((e) => e),
  preview: {
    select: {
      title: 'content',
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
