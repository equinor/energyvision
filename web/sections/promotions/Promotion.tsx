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
  /* grey card background as long as not on colored background */
  onColorBg?: boolean
}

const Promotion = ({
  promotion,
  hasSectionTitle = false,
  onColorBg = false,
}: PromotionProps) => {
  if (!promotion) return null

  const getCard = (data: CardProps) => {
    switch (data?.type) {
      case 'people':
        return (
          <PeopleCard
            data={data as PeopleCardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
          />
        )
      case 'events':
        return (
          <EventCard
            data={data as EventCardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
          />
        )
      default:
        return (
          <PromotionCard
            onColorBg={onColorBg}
            data={data as CardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
          />
        )
    }
  }

  return getCard(promotion)
}

export default Promotion
