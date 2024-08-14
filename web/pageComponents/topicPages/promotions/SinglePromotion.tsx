import type { PeopleCardData, EventCardData, CardData } from '../../../types/index'
import { EventCard } from '@sections/cards/EventCard'
import PeopleCard from '@sections/cards/PeopleCard/PeopleCard'
import PromotionCard from '@sections/cards/PromotionCard/PromotionCard'

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
        return <PromotionCard data={data as CardData} hasSectionTitle={hasSectionTitle} variant="single" />
      case 'topics':
      case 'magazine':
        return <PromotionCard data={data as CardData} hasSectionTitle={hasSectionTitle} variant="single" />
      case 'people':
        return <PeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} variant="single" />
      case 'events':
        return <EventCard data={data as EventCardData} hasSectionTitle={hasSectionTitle} variant="single" />
      default:
        console.warn('Missing card type for ', data)
        return <div />
    }
  }

  return <>{getCard(promotion)}</>
}

export default SinglePromotion
