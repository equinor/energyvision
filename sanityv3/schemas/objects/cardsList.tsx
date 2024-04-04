/* eslint-disable react/display-name */
import { grid_on } from '@equinor/eds-icons'
import { configureTitleBlockContent } from '../editors'
import CompactBlockEditor from '../components/CompactBlockEditor'
import type { PortableTextBlock } from 'sanity'
import blocksToText from '../../helpers/blocksToText'
import { EdsIcon } from '../../icons'
import { Card } from './card'
import { ColorSelectorValue } from '../components/ColorSelector'
import { defaultColors } from '../defaultColors'

const titleContentType = configureTitleBlockContent()

export type CardsList = {
  _type: 'cardsList'
  title?: PortableTextBlock[]
  cards?: Card[]
  background?: ColorSelectorValue
}

export default {
  name: 'cardsList',
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
      description: `On mobile cards will be rendered in 1 column. For larger screens; 
      if 2 or 4 cards - 2 columns else if 3 or more than 4 cards - 3 columns. `,
      name: 'cards',
      type: 'array',
      of: [{ type: 'card' }],
    },
    {
      title: 'The background color on the cards',
      description: 'List title will be on default background. Default is White',
      name: 'background',
      type: 'colorlist',
      fieldset: 'design',
      initialValue: defaultColors[6],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title: PortableTextBlock[] }) {
      const plainTitle = blocksToText(title)
      return {
        title: plainTitle || 'Missing title',
        subtitle: 'Cardslist component',
        media: EdsIcon(grid_on),
      }
    },
  },
}
