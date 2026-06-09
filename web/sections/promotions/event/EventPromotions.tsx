'use client'
import { Carousel } from '@/core/Carousel/Carousel'
import { twMerge } from '@/lib/twMerge/twMerge'
import { EventCard } from '@/sections/cards/EventCard'
import type { EventCardData } from '@/sections/cards/EventCard/EventCard'
import {
  type ColorKeyTokens,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { EventPromotionSettings } from '../../../types/index'
import PastEvents from './pastEvents/PastEvents'

type EventPromotionsProp = {
  promotions: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
  labelledbyId?: string
  promotePastEvents?: boolean
  /**
   * If event is on colored default background send white-100 here. If theme send the foreground color of the theme.
   */
  background?: keyof ColorKeyTokens
  hasBackgroundImage?: boolean
}

const EventPromotions = ({
  promotions,
  hasSectionTitle,
  labelledbyId,
  promotePastEvents = false,
  background,
  hasBackgroundImage = false,
}: EventPromotionsProp) => {
  const bg = colorKeyToUtilityMap[background ?? 'white-100'].background

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
              className={twMerge(
                background && !hasBackgroundImage && bg,
                hasBackgroundImage && `relative z-10 mb-12`,
              )}
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
                          className={twMerge(
                            background && !hasBackgroundImage && bg,
                          )}
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
                  getVariantElementBody={(itemData: EventCardData) => (
                    <EventCard
                      hasSectionTitle={hasSectionTitle}
                      data={itemData}
                      variant='carousel'
                      className={twMerge(
                        background && !hasBackgroundImage && bg,
                      )}
                    />
                  )}
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
