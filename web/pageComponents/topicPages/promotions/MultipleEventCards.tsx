import styled from 'styled-components'
import type { EventCardData } from '../../../types/types'
import EventsCard from '../../cards/EventsCard'

const PairWrapper = styled.div`
  --card-minWidth: 250px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);

  padding: 0 var(--layout-paddingHorizontal-small);
  margin: var(--space-xLarge) auto 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);

  @media (min-width: 990px) {
    padding: 0 var(--layout-paddingHorizontal-medium);
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 380px));
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
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`

type MultipleEventCardsProp = {
  data: EventCardData[]
  hasSectionTitle: boolean
}

const MultipleEventCards = ({ data, hasSectionTitle }: MultipleEventCardsProp) => {
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
