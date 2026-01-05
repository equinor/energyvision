'use client'
import { Carousel } from '@/core/Carousel/Carousel'
import { EventCard } from '@/sections/cards/EventCard'
import type { EventCardData, EventPromotionSettings } from '../../types/index'

type MultipleEventCardsProp = {
  data: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
  renderScroll?: boolean
  labelledbyId?: string
}

const MultipleEventCards = ({
  data,
  hasSectionTitle,
  labelledbyId,
}: MultipleEventCardsProp) => {
  return (
    <>
      {data?.length <= 3 ? (
        <ul
          className={`light grid auto-rows-auto grid-cols-1 content-center justify-center gap-x-4 gap-y-3 md:grid-cols-2 2xl:grid-cols-3`}
        >
          {data.map(item => {
            return (
              <li key={item.id}>
                <EventCard data={item} hasSectionTitle={hasSectionTitle} />
              </li>
            )
          })}
        </ul>
      ) : (
        <Carousel
          variant='event'
          displayMode='scroll'
          items={data}
          {...(hasSectionTitle && {
            labelledbyId: labelledbyId,
          })}
          className=''
          hasSectionTitle={hasSectionTitle}
        />
      )}
    </>
  )
}

export default MultipleEventCards
