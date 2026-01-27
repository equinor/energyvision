import type { EventCardData, EventPromotionSettings } from '@/types'
import PastEventsListItem from './PastEventsListItem'

type PastEventsProp = {
  events: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
}

const PastEvents = ({ events, hasSectionTitle }: PastEventsProp) => {
  console.log("PastEvents events", events);
  return (
    <ul className='grid w-full grid-flow-row auto-rows-max divide-y divide-autumn-storm-60'>
      {events.map(event => {
        return (
          <li key={event.id}>
            <PastEventsListItem
              event={event}
              hasSectionTitle={hasSectionTitle}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default PastEvents
