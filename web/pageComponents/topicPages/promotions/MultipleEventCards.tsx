import { getEventDates } from '../../../common/helpers/dateUtilities'
import type { EventCardData, EventPromotionSettings } from '../../../types/types'
import { EventCard } from '@sections/cards/EventCard'

type MultipleEventCardsProp = {
  data: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
  renderScroll?: boolean
}

const MultipleEventCards = ({ data, hasSectionTitle, eventPromotionSettings }: MultipleEventCardsProp) => {
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

  return (
    <ul
      className=" 
      max-lg:w-full
      grid 
    gap-y-3
    gap-x-4
    grid-cols-1
    justify-center
    content-center
    auto-rows-auto
    md:grid-cols-3
    md:grid-rows-1"
    >
      {data.map((item) => {
        return (
          <li key={item.id}>
            <EventCard data={item} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      })}
    </ul>
  )
}

export default MultipleEventCards
