import styled, { css } from 'styled-components'
import type {
  CardData,
  PeopleCardData,
  EventCardData,
  PromotionType,
  EventPromotionSettings,
} from '../../../types/types'
import MultipleEventCards from './MultipleEventCards'
import { Carousel } from '../../shared/Carousel'
import { BackgroundContainer } from '@components/Backgrounds'
import Card from '@sections/cards/Card'
import { FormattedDate } from '@components/FormattedDateTime'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'
import PeopleCard from '@sections/cards/PeopleCard/PeopleCard'

const PeopleCardsWrapper = styled.ul`
  --min: 210px;

  @media (min-width: 800px) {
    --min: 240px;
  }
  @media (min-width: 1400px) {
    max-width: var(--maxViewportWidth);
  }
`

const CardStyle = css`
  width: 100%;
  height: 100%;
`

const StyledBackground = styled(BackgroundContainer)`
  min-width: var(--card-minWidth);
  max-width: var(--card-maxWidth);
  flex-basis: 0;
  flex-grow: 1;
`

const StyledPeopleCard = styled(PeopleCard)`
  ${CardStyle}
`

type CardProps = CardData | PeopleCardData | EventCardData

const TWCard = ({ slug, title, ingress, publishDateTime, heroImage, id }: CardData) => {
  //const image = useSanityLoader(heroImage?.image, 400, Ratios.NINE_TO_SIXTEEN)

  return (
    <li className="min-w-[var(--card-minWidth)] max-w-[var(--card-maxWidth)] basis-0 grow" key={id}>
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
          {ingress && <Blocks value={ingress} className="grow" clampLines={5} />}
        </Card.Content>
      </Card>
    </li>
  )
}

/** TODO: Update carousel and make it ul list  */
const MultiplePromotions = ({
  data,
  variant,
  hasSectionTitle,
  eventPromotionSettings,
  useHorizontalScroll = false,
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
        return <TWCard key={data.id} {...data} />
      case 'topics':
      case 'magazine':
        return <TWCard key={data.id} {...data} />
      case 'people':
        return (
          <li key={data.id} className="">
            <PeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} />
            {/* <StyledBackground key={data.id}>
              <StyledPeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} key={data.id} />
            </StyledBackground> */}
          </li>
        )
      default:
        return console.warn('Missing card type for ', data)
    }
  }

  const renderScroll = useHorizontalScroll

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

  if (renderScroll) {
    return (
      <>
        <Carousel horizontalPadding>
          {data.map((item) => {
            const card = getCard(item)
            if (card) {
              return (
                <ul className="flex min-w-[280px] max-w-[var(--card-maxWidth)] w-full" key={item.id}>
                  {card}
                </ul>
              )
            }
          })}
        </Carousel>
      </>
    )
  }

  /*   if (variant === 'promotePeople') {
    return (
      <PeopleCardsWrapper className="px-8 flex gap-x-6 gap-y-2 justify-center content-center flex-wrap flex-col md:flex-row">
        <>
          {data.map((item) => {
            return getCard(item)
          })}
        </>
      </PeopleCardsWrapper>
    )
  } */

  return (
    <ul className="px-8 flex gap-x-6 gap-y-2 justify-center content-center flex-wrap flex-col md:flex-row">
      <>
        {data.map((item) => {
          return getCard(item)
        })}
      </>
    </ul>
  )
}

export default MultiplePromotions
