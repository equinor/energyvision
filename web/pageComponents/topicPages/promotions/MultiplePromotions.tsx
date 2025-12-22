import { EventCard } from '@sections/cards/EventCard'
import PeopleCard from '@sections/cards/PeopleCard/PeopleCard'
import PromotionCard from '@sections/cards/PromotionCard/PromotionCard'
import { closestIndexTo } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import type {
  CardData,
  EventCardData,
  EventPromotionSettings,
  PeopleCardData,
  PromotionType,
} from '../../../types/index'
import MultipleEventCards from './MultipleEventCards'

type CardProps = CardData | PeopleCardData | EventCardData

const MultiplePromotions = ({
  data,
  variant,
  hasSectionTitle,
  eventPromotionSettings,
  labelledbyId,
  onColorBg = false,
}: {
  data: CardData[] | PeopleCardData[] | EventCardData[]
  variant: PromotionType
  hasSectionTitle: boolean
  labelledbyId?: string
  eventPromotionSettings?: EventPromotionSettings
  useHorizontalScroll?: boolean | undefined
  /* grey card background as long as not on colored background */
  onColorBg?: boolean
}) => {
  const getCard = (data: CardProps) => {
    switch (data.type) {
      case 'news':
      case 'localNews':
        return (
          <li key={data?.id} className="flex justify-center">
            <PromotionCard
              onColorBg={onColorBg}
              className="light"
              data={data as CardData}
              hasSectionTitle={hasSectionTitle}
            />
          </li>
        )
      case 'topics':
      case 'magazine':
        return (
          <li key={data?.id} className="flex justify-center">
            <PromotionCard
              onColorBg={onColorBg}
              className="light"
              data={data as CardData}
              hasSectionTitle={hasSectionTitle}
            />
          </li>
        )
      case 'people':
        return (
          <li key={data.id} className="flex justify-center">
            <PeopleCard className="light" data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      default:
        return console.warn('Missing card type for ', data)
    }
  }

  const getCols = () => {
    if (data?.length < 3) {
      return `lg:auto-cols-fr lg:grid-flow-col`
    }
    if (data?.length === 3) {
      return `md:grid-cols-3`
    }
    return `md:grid-cols-2 2xl:grid-cols-3`
  }
  const getRowGap = (type: string) => {
    switch (type) {
      case 'promotePeople':
        return `gap-y-3 lg:gap-y-8 gap-x-4`

      default:
        return ` gap-y-3 gap-x-4`
    }
  }

  let closestToTodayIndex
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
            className="light"
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
      justify-center
      content-center
      auto-rows-fr
      grid-cols-1
      ${getCols()}
      ${getRowGap(variant)}
      `)}
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
