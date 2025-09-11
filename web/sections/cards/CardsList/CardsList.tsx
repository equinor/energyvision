import type { CardsListData } from '../../../types/index'
import CardItem from './CardItem'
import { colorKeyToUtilityMap } from '../../../styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'
import Blocks from '@/portableText/Blocks'

export type CardsListProps = {
  data: CardsListData
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const CardsList = forwardRef<HTMLElement, CardsListProps>(function CardsList(
  { data, anchor, className = '', ...rest },
  ref,
) {
  const { title, cards = [], designOptions } = data
  const { background } = designOptions || {}
  const { backgroundUtility, dark } = background || {}

  // For 2 or 4 cards
  let gridColumns = 'grid-cols-1 lg:grid-cols-2'
  // For 3 or more than 4 cards
  if (cards?.length === 3 || cards?.length > 4) {
    // 2 in width for mobile, but 3 for wider screens
    gridColumns = 'grid-cols-1 lg:grid-cols-3'
  }
  const cardBackground = backgroundUtility
    ? colorKeyToUtilityMap[backgroundUtility]
    : { background: 'bg-blue-50', dark: true }

  return (
    <section ref={ref} className={twMerge(`mx-auto px-layout-md pb-page-content`, className)} id={anchor} {...rest}>
      {title && <Blocks value={title} variant="h3" as="h2" blockClassName="pb-10" />}
      <ul className={`grid ${gridColumns} gap-4`}>
        {cards?.map((card) => {
          return (
            <CardItem
              key={`card_item_${card?.id}`}
              data={card}
              className={`${cardBackground.dark ? 'dark' : ''} ${cardBackground?.background}`}
            />
          )
        })}
      </ul>
    </section>
  )
})

export default CardsList
