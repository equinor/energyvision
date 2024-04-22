import styled from 'styled-components'
import PeopleCard from '../../cards/PeopleCard/PeopleCard'
import EventCard from '../../cards/EventsCard'
import NewsCard from '../../cards/NewsCard'
import TopicPageCard from '../../cards/TopicPageCard'

import type { PeopleCardData, EventCardData, CardData } from '../../../types/types'

const LandscapeWrapper = styled.div`
  /* max-width: 350px; */
  padding: 0 var(--space-xLarge);
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 700px) {
    max-width: var(--maxViewportWidth);
  }
`
type CardProps = CardData | PeopleCardData | EventCardData

type SinglePromotionData = {
  promotion: PeopleCardData | CardData | EventCardData
  hasSectionTitle?: boolean
}

const SinglePromotion = ({ promotion, hasSectionTitle = false }: SinglePromotionData) => {
  const getCard = (data: CardProps) => {
    switch (data.type) {
      case 'news':
      case 'localNews':
        return <NewsCard data={data as CardData} />
      case 'topics':
      case 'magazine':
        return <TopicPageCard data={data as CardData} />
      case 'people':
        return <PeopleCard orientation="landscape" data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} />
      case 'events':
        return <EventCard data={data as EventCardData} orientation="landscape" hasSectionTitle={hasSectionTitle} />
      default:
        console.warn('Missing card type for ', data)
        return <div />
    }
  }

  return <LandscapeWrapper>{getCard(promotion)}</LandscapeWrapper>
}

export default SinglePromotion
