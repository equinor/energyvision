import { EventCard } from '@/sections/cards/EventCard'
import PeopleCard from '@/sections/cards/PeopleCard/PeopleCard'
import PromotionCard from '@/sections/cards/PromotionCard/PromotionCard'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import type { CardData, EventCardData, PeopleCardData } from '../../types/index'

type CardProps = CardData | PeopleCardData | EventCardData

type PromotionProps = {
  promotion: PeopleCardData | CardData | EventCardData
  background?: ColorKeys
  hasSectionTitle?: boolean
}

const Promotion = ({
  promotion,
  hasSectionTitle = false,
  background,
}: PromotionProps) => {
  if (!promotion) return null
  const getCard = (data: CardProps) => {
    switch (data?.type) {
      case 'news':
      case 'localNews':
        return (
          <PromotionCard
            background={background}
            data={data as CardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
          />
        )
      case 'topics':
      case 'magazine':
        return (
          <PromotionCard
            background={background}
            data={data as CardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
          />
        )
      case 'people':
        return (
          <PeopleCard
            background={background}
            data={data as PeopleCardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
          />
        )
      case 'events':
        return (
          <EventCard
            background={background}
            data={data as EventCardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
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
