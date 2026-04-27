/* eslint-disable react/display-name */
import { CiGrid41 } from 'react-icons/ci'
import type { PortableTextBlock, Rule } from 'sanity'
import { shortenWithEllipsis } from '@/helpers/formatters'
import blocksToText from '../../helpers/blocksToText'
import type { ColorSelectorValue } from '../components/ColorSelector'
import { CompactBlockEditor } from '../components/CompactBlockEditor'
import {
  defaultBackgroundColors,
  defaultColors,
  getDefaultColorByKey,
  getDefaultColorByValue,
} from '../defaultColors'
import { configureBlockContent } from '../editors'
import type { Card } from './card'
import { createColorStringSelectField } from './colorList'
import { layoutGrid } from './commonFields/commonFields'

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
  fields: [
    {
      name: 'title',
      type: 'array',
      title: 'Title for the list of cards',
      description: 'Should have title for context, you may hide it',
      components: {
        input: CompactBlockEditor,
      },
      of: [configureBlockContent({ variant: 'title' })],
    },
    {
      name: 'hideTitle',
      type: 'boolean',
      title: 'Hide title',
      description:
        'Hides the title, but screen readers will get it for context',
    },
    {
      title: 'Cards',
      description: `1 column on mobile, 2 columns if 2 or 4 cards, 3 columns if 3 or more than 4 cards. `,
      name: 'cards',
      type: 'array',
      of: [{ type: 'card' }],
      validation: (Rule: Rule) =>
        Rule.required()
          .min(1)
          .error('At least one card with a valid title is required.'),
    },
    createColorStringSelectField({
      name: 'cardBackground',
      title: 'Card background color',
      colors: [
        ...defaultBackgroundColors.filter(color => color.key !== 'white-100'),
        defaultColors[22],
      ],
      valueField: 'key',
    }),
    layoutGrid(),
    {
      title: 'Apply display text variant',
      name: 'displayTextVariant',
      type: 'string',
      description: 'Sets a display variant on card content',
      initialValue: 'none', // default
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Base', value: 'base' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra large', value: 'xl' },
        ],
      },
      hidden: (props: any) => {
        const { currentUser } = props || {}
        const allowedRoles = ['designer', 'administrator', 'developer']
        const isAllowed = currentUser?.roles?.some((role: any) =>
          allowedRoles?.includes(role?.name),
        )
        return !isAllowed
      },
    },
    {
      title: 'Card background color',
      deprecated: true,
      description: 'Default Mid Blue',
      name: 'background',
      type: 'colorlist',
      initialValue: defaultColors[6],
      hidden: ({ value }: any) => {
        return !value
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      cards: 'cards',
      card1: 'cards.0.title',
      card2: 'cards.1.title',
      card3: 'cards.2.title',
      cardBackground: 'cardBackground',
    },
    prepare({
      title,
      cards,
      card1,
      card2,
      card3,
      cardBackground,
    }: {
      title: PortableTextBlock[]
      cards: any
      card1: string
      card2: string
      card3: string
      cardBackground?: string
    }) {
      const plainTitle = blocksToText(title)
      const plainCard1 = card1 ? card1 : undefined
      const plainCard2 = card2 ? card2 : undefined
      const plainCard3 = card3 ? card3 : undefined

      const previewBackgroundColor = getDefaultColorByKey(
        cardBackground ?? defaultColors[6].key,
      )
      const previewIconColor = previewBackgroundColor?.dark
        ? '#FFFFFF'
        : '#111827'

      const subtitleParts = [
        shortenWithEllipsis(plainCard1 ?? '', 15),
        shortenWithEllipsis(plainCard2 ?? '', 15),
        shortenWithEllipsis(plainCard3 ?? '', 15),
      ].filter(Boolean)

      return {
        title: plainTitle ?? subtitleParts.join(', ') ?? 'List of cards',
        subtitle: `List of ${Object.keys(cards ?? {}).length} cards`,
        media: (
          <div
            style={{
              alignItems: 'center',
              backgroundColor: previewBackgroundColor?.value,
              borderRadius: '0.1875rem',
              color: previewIconColor,
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <CiGrid41 size={24} style={{ fill: previewIconColor }} />
          </div>
        ),
      }
    },
  },
}
