import { twMerge } from 'tailwind-merge'
import { EventCard } from '@/sections/cards/EventCard'

import PeopleCard from '@/sections/cards/PeopleCard/PeopleCard'
import PromotionCard from '@/sections/cards/PromotionCard/PromotionCard'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'
import type { CardData, EventCardData, PeopleCardData } from '../../types/index'
import MultipleEventCards from './MultipleEventCards'
import type {
  EventPromotion,
  MagazinePromotion,
  NewsPromotion,
  PeoplePromotion,
  PromotionType,
  TopicPromotion,
} from './PromotionsBlock'
import PastEvents from './pastEvents/PastEvents'

type CardProps = CardData | PeopleCardData | EventCardData

const MultiplePromotions = ({
  data,
  variant,
  hasSectionTitle,
  labelledbyId,
  background,
}: {
  data:
    | EventPromotion
    | MagazinePromotion
    | TopicPromotion
    | NewsPromotion
    | PeoplePromotion
  variant: PromotionType
  background?: ColorKeys
  hasSectionTitle: boolean
  labelledbyId?: string
}) => {
  const { promotions = [] } = data

  const getCard = (data: CardProps) => {
    switch (data.type) {
      case 'news':
      case 'localNews':
        return (
          <li key={data?.id} className='flex justify-center'>
            <PromotionCard
              background={background}
              data={data as CardData}
              hasSectionTitle={hasSectionTitle}
            />
          </li>
        )
      case 'people':
        return (
          <li key={data.id} className='flex justify-center'>
            <PeopleCard
              background={background}
              data={data as PeopleCardData}
              hasSectionTitle={hasSectionTitle}
            />
          </li>
        )
      default:
        return (
          <li key={data?.id} className='flex justify-center'>
            <PromotionCard
              background={background}
              data={data as CardData}
              hasSectionTitle={hasSectionTitle}
            />
          </li>
        )
    }
  }
  const getRowGap = (type: string) => {
    switch (type) {
      case 'promotePeople':
        return 'gap-y-3 lg:gap-y-8 gap-x-4'

      default:
        return 'gap-y-3 gap-x-4'
    }
  }

  if (variant === 'promoteEvents') {
    return (
      <>
        {(data as EventPromotion)?.promotePastEvents ? (
          <PastEvents
            events={data?.promotions as EventCardData[]}
            hasSectionTitle={hasSectionTitle}
          />
        ) : promotions?.length === 1 ? (
          <EventCard
            data={promotions[0] as EventCardData}
            hasSectionTitle={hasSectionTitle}
            variant='single'
            className='light'
          />
        ) : (
          <MultipleEventCards
            data={promotions as EventCardData[]}
            hasSectionTitle={hasSectionTitle}
            renderScroll={false}
            labelledbyId={labelledbyId}
          />
        )}
      </>
    )
  }

  return (
    promotions?.length > 0 && (
      <ul
        className={twMerge(
          `grid max-lg:w-full ${getRowGap(variant)} auto-rows-fr grid-cols-1 content-center justify-center ${promotions?.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 2xl:grid-cols-3'}`,
        )}
      >
        {promotions.map(item => {
          return getCard(item)
        })}
      </ul>
    )
  )
}

export default MultiplePromotions
