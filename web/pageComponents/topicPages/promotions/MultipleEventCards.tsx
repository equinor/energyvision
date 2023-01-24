import { getEventDates } from '../../../common/helpers/dateUtilities'
import styled from 'styled-components'
import type { EventCardData, EventPromotionSettings } from '../../../types/types'
import EventsCard from '../../cards/EventsCard'
import { HorizontalScroll, HorizontalScrollItem } from '../../shared/HorizontalScroll'
import { Flags } from '../../../common/helpers/datasetHelpers'

const PairWrapper = styled.div`
  --card-minWidth: 250px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);

  padding: 0 var(--layout-paddingHorizontal-small);
  margin: 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);

  @media (min-width: 990px) {
    --card-minWidth: 340px;
    padding: 0 var(--layout-paddingHorizontal-medium);
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--card-minWidth)), 1fr));
  }
`

const FlexibleWrapper = styled.div`
  --card-minWidth: 250px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);
  @media (min-width: 1000px) {
    --card-minWidth: 340px;
  }

  padding: 0 var(--layout-paddingHorizontal-small);
  margin: var(--space-xLarge) auto 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`

type MultipleEventCardsProp = {
  data: EventCardData[]
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
  renderScroll?: boolean
}

const StyledEventsCard = styled(EventsCard)`
  --card-minWidth: 250px;

  @media (min-width: 1000px) {
    --card-minWidth: 340px;
  }

  width: var(--card-minWidth);
`

const MultipleEventCards = ({
  data,
  hasSectionTitle,
  eventPromotionSettings,
  renderScroll = false,
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
  if (eventPromotionSettings?.pastEventsCount) {
    data = data.slice(0, eventPromotionSettings.pastEventsCount)
  }

  if (Flags.IS_DEV && renderScroll) {
    return (
      <HorizontalScroll type="card">
        {data.map((item) => {
          return (
            <HorizontalScrollItem key={item.id}>
              <StyledEventsCard data={item} hasSectionTitle={hasSectionTitle} key={item.id} />
            </HorizontalScrollItem>
          )
        })}
      </HorizontalScroll>
    )
  }

  return (
    <>
      {data.length === 2 ? (
        <PairWrapper>
          {data.map((item: EventCardData) => {
            return <EventsCard data={item} hasSectionTitle={hasSectionTitle} key={item.id} />
          })}
        </PairWrapper>
      ) : (
        <FlexibleWrapper>
          {data.map((item) => {
            return <EventsCard data={item} hasSectionTitle={hasSectionTitle} key={item.id} />
          })}
        </FlexibleWrapper>
      )}
    </>
  )
}

export default MultipleEventCards
