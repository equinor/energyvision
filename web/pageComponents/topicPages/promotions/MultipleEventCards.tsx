import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import { getEventDates } from '../../../common/helpers/dateUtilities'
import type { EventCardData, EventPromotionSettings } from '../../../types/index'
import { EventCard } from '@sections/cards/EventCard'
import PastEvents from './pastEvents/PastEvents'
import { Carousel } from '@core/Carousel/Carousel'

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
  eventPromotionSettings,
}: MultipleEventCardsProp) => {
  // sort only automatically selected future events
  if (!eventPromotionSettings?.manuallySelectEvents && !eventPromotionSettings?.promotePastEvents) {
    data.sort((a, b) => {
      return (
        new Date(getEventDates(a.eventDate).start || a.eventDate.date).getTime() -
        new Date(getEventDates(b.eventDate).start || b.eventDate.date).getTime()
      )
    })
  }
  if (eventPromotionSettings?.upcomingEventsCount) {
    data = data.slice(0, eventPromotionSettings.upcomingEventsCount)
  }

  if (eventPromotionSettings?.promotePastEvents && eventPromotionSettings?.pastEventsCount) {
    data = data.slice(0, eventPromotionSettings.pastEventsCount)
  }
  const isMobile = useMediaQuery(`(max-width: 768px)`)

  return (
    <>
      {eventPromotionSettings?.promotePastEvents && <PastEvents events={data} hasSectionTitle={hasSectionTitle} />}
      {!eventPromotionSettings?.promotePastEvents && (
        <>
          {data?.length <= 4 || isMobile ? (
            <ul
              className={` 
                grid 
                gap-y-3
                gap-x-4
                grid-cols-1
                justify-center
                content-center
                auto-rows-auto
                md:${data.length === 2 ? 'grid-cols-2 grid-rows-1' : 'grid-cols-3 grid-rows-1'}`}
            >
              {data.map((item) => {
                return (
                  <li key={item.id}>
                    <EventCard data={item} hasSectionTitle={hasSectionTitle} />
                  </li>
                )
              })}
            </ul>
          ) : (
            <Carousel
              variant="event"
              items={data}
              {...(hasSectionTitle && {
                labelledbyId: labelledbyId,
              })}
              className="lg:px-0 max-w-viewport"
              hasSectionTitle={hasSectionTitle}
            />
          )}
        </>
      )}
    </>
  )
}

export default MultipleEventCards
