import type {
  CardData,
  PeopleCardData,
  EventCardData,
  PromotionType,
  EventPromotionSettings,
} from '../../../types/index'
import MultipleEventCards from './MultipleEventCards'

import PeopleCard from '@sections/cards/PeopleCard/PeopleCard'
import { EventCard } from '@sections/cards/EventCard'
import { closestIndexTo } from 'date-fns'
import PromotionCard from '@sections/cards/PromotionCard/PromotionCard'
import { twMerge } from 'tailwind-merge'

type CardProps = CardData | PeopleCardData | EventCardData

const MultiplePromotions = ({
  data,
  variant,
  hasSectionTitle,
  eventPromotionSettings,
  labelledbyId,
}: {
  data: CardData[] | PeopleCardData[] | EventCardData[]
  variant: PromotionType
  hasSectionTitle: boolean
  labelledbyId?: string
  eventPromotionSettings?: EventPromotionSettings
  useHorizontalScroll?: boolean | undefined
}) => {
  const getCard = (data: CardProps) => {
    switch (data.type) {
      case 'news':
      case 'localNews':
        return (
          <li key={data?.id}>
            <PromotionCard data={data as CardData} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      case 'topics':
      case 'magazine':
        return (
          <li key={data?.id}>
            <PromotionCard data={data as CardData} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      case 'people':
        return (
          <li key={data.id} className="flex justify-center">
            <PeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      default:
        return console.warn('Missing card type for ', data)
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

  let closestToTodayIndex = undefined
  if (
    variant === 'promoteEvents' &&
    (eventPromotionSettings?.promoteSingleUpcomingEvent || eventPromotionSettings?.upcomingEventsCount === 1)
  ) {
    const events = data as EventCardData[]
    closestToTodayIndex = closestIndexTo(
      new Date(),
      events?.map((event) => new Date(event?.eventDate?.date)),
    )
  }

  if (variant === 'promoteEvents') {
    return (
      <>
        {typeof closestToTodayIndex === 'number' &&
        closestToTodayIndex >= 0 &&
        (eventPromotionSettings?.promoteSingleUpcomingEvent || eventPromotionSettings?.upcomingEventsCount === 1) ? (
          <EventCard
            data={data[closestToTodayIndex] as EventCardData}
            hasSectionTitle={hasSectionTitle}
            variant="single"
          />
        ) : (
          <MultipleEventCards
            data={data as EventCardData[]}
            hasSectionTitle={hasSectionTitle}
            eventPromotionSettings={eventPromotionSettings}
            renderScroll={false}
            labelledbyId={labelledbyId}
          />
        )}
      </>
    )
  }

  return (
    <ul
      className={twMerge(`
      max-lg:w-full
      grid 
      ${getRowGap(variant)}
      justify-center
      content-center
      grid-cols-1
      auto-rows-auto
      md:grid-cols-3
      md:grid-rows-1`)}
    >
      <>
        {data.map((item) => {
          return getCard(item)
        })}
      </>
    </ul>
  )
}

export default MultiplePromotions
