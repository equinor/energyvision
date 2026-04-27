import type { PortableTextBlock } from 'next-sanity'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getLayoutPx } from '@/lib/helpers/getCommonUtilities'
import Blocks from '@/portableText/Blocks'
import type { LayoutGrid } from '@/types'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '../../../styles/colorKeyToUtilityMap'
import CardItem, { type CardItemProps } from './CardItem'

export type CardsListProps = {
  id: string
  title?: PortableTextBlock[]
  hideTitle?: boolean
  cards?: CardItemProps[]
  designOptions: {
    layoutGrid?: LayoutGrid
    //  color utility key e.g. 'blue-50'
    cardBackground?: ColorKeys
    displayTextVariant?: 'none' | 'base' | 'lg' | 'xl'
  }
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const CardsList = forwardRef<HTMLElement, CardsListProps>(function CardsList(
  { title, hideTitle, cards = [], designOptions, anchor, className = '' },
  ref,
) {
  const { layoutGrid, cardBackground, displayTextVariant } = designOptions || {}

  // For 2 or 4 cards
  let gridColumns = 'grid-cols-1 lg:grid-cols-2'
  // For 3 or more than 4 cards
  if (cards?.length === 3 || cards?.length > 4) {
    // 2 in width for mobile, but 3 for wider screens
    gridColumns = 'grid-cols-1 lg:grid-cols-3'
  }

  const bg = colorKeyToUtilityMap[cardBackground ?? 'blue-50']
  console.log('cardBackground', cardBackground)
  const px = getLayoutPx(layoutGrid ?? 'md')

  return (
    <section
      ref={ref}
      className={twMerge(`pb-page-content`, className)}
      id={anchor}
    >
      {title && (
        <Blocks
          value={title}
          variant='h2'
          blockClassName={hideTitle ? 'sr-only' : 'px-layout-lg pb-10'}
        />
      )}
      <ul className={`${px} grid ${gridColumns} gap-4`}>
        {cards?.map(card => {
          return (
            <CardItem
              key={`card_item_${card?.id}`}
              {...card}
              background={bg?.background}
              dark={bg?.dark}
              displayTextVariant={displayTextVariant}
            />
          )
        })}
      </ul>
    </section>
  )
})

export default CardsList
