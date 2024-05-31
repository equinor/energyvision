import type {
  CardData,
  PeopleCardData,
  EventCardData,
  PromotionType,
  EventPromotionSettings,
} from '../../../types/types'
import MultipleEventCards from './MultipleEventCards'
import Card from '@sections/cards/Card'
import { FormattedDate } from '@components/FormattedDateTime'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'
import PeopleCard from '@sections/cards/PeopleCard/PeopleCard'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'

type CardProps = CardData | PeopleCardData | EventCardData

const PromoCard = ({ slug, title, ingress, publishDateTime, heroImage, id, type }: CardData) => {
  const isMobile = useMediaQuery(`(max-width: 768px)`)

  return (
    <li className="" key={id}>
      <Card href={slug} image={heroImage?.image} className="w-full h-full" key={id}>
        <Card.Content>
          <Card.Header
            {...(typeof title === 'string'
              ? {
                  title: title,
                }
              : {
                  titleBlock: title,
                })}
            {...(publishDateTime && {
              eyebrow: <FormattedDate datetime={publishDateTime} uppercase />,
            })}
          />
          {ingress && (
            <Blocks
              value={ingress}
              className={`grow ${type !== 'news' && type !== 'localNews' ? '' : 'hidden lg:block'}`}
              clampLines={isMobile ? 3 : 5}
            />
          )}
        </Card.Content>
      </Card>
    </li>
  )
}

const MultiplePromotions = ({
  data,
  variant,
  hasSectionTitle,
  eventPromotionSettings,
}: {
  data: CardData[] | PeopleCardData[] | EventCardData[]
  variant: PromotionType
  hasSectionTitle: boolean
  eventPromotionSettings?: EventPromotionSettings
  useHorizontalScroll?: boolean | undefined
}) => {
  const getCard = (data: CardProps) => {
    switch (data.type) {
      case 'news':
      case 'localNews':
        return <PromoCard key={data.id} {...data} />
      case 'topics':
      case 'magazine':
        return <PromoCard key={data.id} {...data} />
      case 'people':
        return (
          <li key={data.id} className="">
            <PeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} />
          </li>
        )
      default:
        return console.warn('Missing card type for ', data)
    }
  }

  if (variant === 'promoteEvents') {
    return (
      <MultipleEventCards
        data={data as EventCardData[]}
        hasSectionTitle={hasSectionTitle}
        eventPromotionSettings={eventPromotionSettings}
        renderScroll={false}
      />
    )
  }

  return (
    <ul
      className="
      grid 
    gap-y-2
    gap-x-4
    justify-center
    content-center
    auto-rows-fr
    md:grid-cols-3
    md:grid-rows-1"
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
