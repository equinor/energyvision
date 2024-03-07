/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import type { PortableTextBlock } from 'sanity'
import type { DownloadableImage } from './downloadableImage'
import type { DownloadableFile } from './files'
import type { LinkSelector } from './linkSelector'
import { ThemeSelectorValue } from '../components/ThemeSelector'

const titleContentType = configureTitleBlockContent({
  highlight: true,
})

export type CardsList = {
  _type: 'cardsList'
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
  action?: (LinkSelector | DownloadableFile | DownloadableImage)[]
  titlePosition?: string
  theme?: ThemeSelectorValue
}

export default {
  name: 'cardslist',
  title: 'List of cards',
  type: 'object',
  localize: true,
  fieldsets: [
    {
      title: 'Design options',
      name: 'design',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'List of cards',
      name: 'listOfCards',
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
      title: 'Title for the list of cards',
      components: {
        input: CompactBlockEditor,
      },
      of: [titleContentType],
    },
    {
      title: 'Cards',
      fieldset: 'listOfCards',
      name: 'cards',
      type: 'array',
      of: [{ type: 'card' }],
    },
    {
      title: 'The background color',
      description: 'Default is white',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
    },
  ],
  /*   preview: {
    select: {
      title: 'title',
      text: 'text',
    },
    prepare({ title, text }: { title: PortableTextBlock[]; text: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)
      return {
        title: plainTitle || 'Missing teaser title',
        subtitle: blocksToText(text) || 'Mising teaser text',
      }
    },
  }, */
}
