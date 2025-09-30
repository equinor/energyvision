import type { EventCardData, EventPromotionSettings } from '../../../types/index'
import PastEventsListItem from './PastEventsListItem'

type PastEventsProp = {
  events: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
}

const PastEvents = ({ events, hasSectionTitle }: PastEventsProp) => {
  return (
    <ul className="grid w-full grid-flow-row auto-rows-max divide-y-[1px] divide-autumn-storm-60">
      {events.map((event) => {
        return (
          <li key={event.id}>
            <PastEventsListItem event={event} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      })}
    </ul>
  )
}

export default PastEvents
