import type { CardsListData } from '../../types/types'
import CardItem from './CardItem'
import { colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { Heading } from '../../core/Typography'
import { twMerge } from 'tailwind-merge'
import { HTMLAttributes, forwardRef } from 'react'

export type CardsListProps = {
  data: CardsListData
  anchor?: string
} & HTMLAttributes<HTMLElement>

const CardsList = forwardRef<HTMLElement, CardsListProps>(function CardsList(
  { data, anchor, className = '', ...rest },
  ref,
) {
  const { title, cards = [], designOptions } = data
  const { utility, dark } = designOptions

  // For 2 or 4 cards
  let gridColumns = 'grid-cols-1 lg:grid-cols-2'
  // For 3 or more than 4 cards
  if (cards?.length === 3 || cards?.length > 4) {
    // 2 in width for mobile, but 3 for wider screens
    gridColumns = 'grid-cols-1 lg:grid-cols-3'
  }
  const cardBackground = colorKeyToUtilityMap[utility] ?? 'bg-blue-50'

  return (
    <section
      ref={ref}
      className={twMerge(`px-layout-md my-3xl max-w-viewport mx-auto`, className)}
      id={anchor}
      {...rest}
    >
      {title && <Heading value={title} variant="h3" as="h2" />}
      <ul className={`grid ${gridColumns} gap-4`}>
        {cards?.map((card) => {
          return (
            <CardItem
              key={`card_item_${card?.id}`}
              data={card}
              className={`${dark ? 'dark' : ''} ${cardBackground.background}`}
            />
          )
        })}
      </ul>
    </section>
  )
})

export default CardsList
