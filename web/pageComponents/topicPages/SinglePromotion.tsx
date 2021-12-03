import styled from 'styled-components'
import PeopleCard from '../cards/PeopleCard/PeopleCard'
import EventCard from '../cards/EventsCard'
import NewsCard from '../cards/NewsCard'
import TopicPageCard from '../cards/TopicPageCard'

import type { PeopleCardData, EventCardData, CardData } from '../../types/types'

const LandscapeWrapper = styled.div`
  max-width: 250px;
  margin-top: var(--space-xLarge);
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 450px) {
    padding: 0 var(--layout-paddingHorizontal-large);
    max-width: var(--maxViewportWidth);
  }
`
type CardProps = CardData | PeopleCardData | EventCardData

type SinglePromotionData = {
  promotion: PeopleCardData | CardData | EventCardData
  hasSectionTitle?: boolean
}

const SinglePromotion = ({ promotion, hasSectionTitle = false }: SinglePromotionData) => {
  console.log('promotion', promotion)

  const getCard = (data: CardProps) => {
    console.log(data.type)
    switch (data.type) {
      case 'news':
        return <NewsCard data={data as CardData} />
      case 'topics':
        return <TopicPageCard data={data as CardData} />
      case 'people':
        return <PeopleCard orientation="landscape" data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} />
      case 'events':
        return <EventCard data={data as EventCardData} hasSectionTitle={hasSectionTitle} />
      default:
        console.warn('Missing card type for ', data)
        return <div />
    }
  }

  return <LandscapeWrapper>{getCard(promotion)}</LandscapeWrapper>
}

export default SinglePromotion
