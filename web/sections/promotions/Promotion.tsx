import type { PeopleCardData, EventCardData, CardData } from '../../types/index'
import { EventCard } from '@/sections/cards/EventCard'
import PeopleCard from '@/sections/cards/PeopleCard/PeopleCard'
import PromotionCard from '@/sections/cards/PromotionCard/PromotionCard'

type CardProps = CardData | PeopleCardData | EventCardData

type PromotionProps = {
  promotion: PeopleCardData | CardData | EventCardData
  hasSectionTitle?: boolean
}

const Promotion = ({ promotion, hasSectionTitle = false }: PromotionProps) => {
  if (!promotion) return null
  const getCard = (data: CardProps) => {
    switch (data?.type) {
      case 'news':
      case 'localNews':
        return (
          <PromotionCard className="light" data={data as CardData} hasSectionTitle={hasSectionTitle} variant="single" />
        )
      case 'topics':
      case 'magazine':
        return (
          <PromotionCard className="light" data={data as CardData} hasSectionTitle={hasSectionTitle} variant="single" />
        )
      case 'people':
        return (
          <PeopleCard
            className="light"
            data={data as PeopleCardData}
            hasSectionTitle={hasSectionTitle}
            variant="single"
          />
        )
      case 'events':
        return (
          <EventCard
            className="light"
            data={data as EventCardData}
            hasSectionTitle={hasSectionTitle}
            variant="single"
          />
        )
      default:
        console.warn('Missing card type for ', data)
        return <div />
    }
  }

  return getCard(promotion)
}

export default Promotion
