'use client'
import { Carousel } from '@/core/Carousel/Carousel'
import { EventCard } from '@/sections/cards/EventCard'
import type { EventCardData } from '@/sections/cards/EventCard/EventCard'
import type { EventPromotionSettings } from '../../../types/index'
import PastEvents from './pastEvents/PastEvents'

type EventPromotionsProp = {
  promotions: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
  labelledbyId?: string
  promotePastEvents?: boolean
  onColorBg?: boolean
  hasBackgroundImage?: boolean
}

const EventPromotions = ({
  promotions,
  hasSectionTitle,
  labelledbyId,
  promotePastEvents = false,
  onColorBg = false,
  hasBackgroundImage = false,
}: EventPromotionsProp) => {
  return (
    <div
      className={`pt-6 ${promotions?.length === 1 ? 'px-layout-sm md:px-layout-lg' : `3xl:px-layout-md px-layout-sm`}`}
    >
      {promotePastEvents ? (
        <PastEvents events={promotions} hasSectionTitle={hasSectionTitle} />
      ) : (
        <>
          {promotions?.length === 1 && (
            <EventCard
              data={promotions[0]}
              hasSectionTitle={hasSectionTitle}
              variant='single'
              className={hasBackgroundImage ? `relative z-10 mb-12` : ''}
              {...(onColorBg &&
                !hasBackgroundImage && {
                  background: 'white-100',
                })}
            />
          )}
          {promotions?.length > 1 && (
            <>
              {promotions?.length <= 3 ? (
                <ul
                  className={`light grid auto-rows-auto grid-cols-1 content-center justify-center gap-x-4 gap-y-3 md:grid-cols-2 2xl:grid-cols-3`}
                >
                  {promotions.map(item => {
                    return (
                      <li key={item.id}>
                        <EventCard
                          data={item}
                          hasSectionTitle={hasSectionTitle}
                          {...(onColorBg && {
                            background: 'white-100',
                          })}
                        />
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <Carousel
                  variant='event'
                  displayMode='scroll'
                  items={promotions}
                  {...(hasSectionTitle && {
                    labelledbyId: labelledbyId,
                  })}
                  hasSectionTitle={hasSectionTitle}
                />
              )}{' '}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default EventPromotions
