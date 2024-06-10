import { getEventDates } from '../../../common/helpers/dateUtilities'
import styled from 'styled-components'
import type { EventCardData, EventPromotionSettings } from '../../../types/index'
import EventsCard from '../../cards/EventsCard'
import { Carousel } from '../../shared/Carousel'
import { BackgroundContainer } from '@components/Backgrounds'

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

const StyledBackground = styled(BackgroundContainer)`
  --card-maxWidth: 280px;

  @media (min-width: 1000px) {
    --card-maxWidth: 400px;
  }

  min-width: var(--card-maxWidth, 100%);
  max-width: var(--card-maxWidth, 100%);
`
const StyledEventsCard = styled(EventsCard)`
  width: 100%;
  height: 100%;
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
  if (eventPromotionSettings?.promotePastEvents && eventPromotionSettings?.pastEventsCount) {
    data = data.slice(0, eventPromotionSettings.pastEventsCount)
  }

  if (renderScroll) {
    return (
      <>
        <Carousel horizontalPadding={true}>
          {data.map((item) => {
            return (
              <StyledBackground key={item.id}>
                <StyledEventsCard data={item} hasSectionTitle={hasSectionTitle} key={item.id} />
              </StyledBackground>
            )
          })}
        </Carousel>
      </>
    )
  }

  return (
    <>
      {data.length === 1 ? (
        <div className="mt-6 px-6 m-auto">
          {data.map((item: EventCardData) => {
            return <EventsCard data={item} hasSectionTitle={hasSectionTitle} key={item.id} />
          })}
        </div>
      ) : data.length === 2 ? (
        <div className=" w-full py-0 px-layout-xs mx-auto my-0 max-w-viewport grid grid-cols-2 gap-x-6 gap-y-2">
          {data.map((item: EventCardData) => {
            return <EventsCard className="w-full" data={item} hasSectionTitle={hasSectionTitle} key={item.id} />
          })}
        </div>
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
