import { EventCard } from '@sections/cards/EventCard'
import PeopleCard from '@sections/cards/PeopleCard/PeopleCard'
import PromotionCard from '@sections/cards/PromotionCard/PromotionCard'
import type { CardData, EventCardData, PeopleCardData } from '../../../types/index'

type CardProps = CardData | PeopleCardData | EventCardData

type SinglePromotionData = {
  promotion: PeopleCardData | CardData | EventCardData
  hasSectionTitle?: boolean
  /* grey card background as long as not on colored background */
  onColorBg?: boolean
}

const SinglePromotion = ({ promotion, hasSectionTitle = false, onColorBg = false }: SinglePromotionData) => {
  if (!promotion) return null
  const getCard = (data: CardProps) => {
    switch (data?.type) {
      case 'news':
      case 'localNews':
        return (
          <PromotionCard
            onColorBg={onColorBg}
            className="light"
            data={data as CardData}
            hasSectionTitle={hasSectionTitle}
            variant="single"
          />
        )
      case 'topics':
      case 'magazine':
        return (
          <PromotionCard
            onColorBg={onColorBg}
            className="light"
            data={data as CardData}
            hasSectionTitle={hasSectionTitle}
            variant="single"
          />
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

  return <>{getCard(promotion)}</>
}

export default SinglePromotion
