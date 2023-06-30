import styled, { css } from 'styled-components'
import type {
  CardData,
  PeopleCardData,
  EventCardData,
  PromotionType,
  EventPromotionSettings,
} from '../../../types/types'
import NewsCard from '../../cards/NewsCard'
import TopicPageCard from '../../cards/TopicPageCard'
import PeopleCard from '../../cards/PeopleCard/PeopleCard'
import MultipleEventCards from './MultipleEventCards'
import useWindowSize from '../../../lib/hooks/useWindowSize'
import { Carousel } from '../../shared/Carousel'

const CardsWrapper = styled.div`
  width: 100%;
  max-width: calc(var(--card-maxWidth) * 3 + var(--space-large) * 2);
  padding: 0 var(--space-xxLarge);
  margin: auto;
  display: flex;
  gap: var(--space-large);
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;

  @media (min-width: 750px) {
    flex-direction: row;
  }
`

const PeopleCardsWrapper = styled.div`
  --min: 210px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);
  padding: 0 var(--space-xxLarge);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--min), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
  justify-content: center;
  align-content: center;
  /* We need some breakpoints here because we don't know if we have 2 or 20 people cards,
  and if we have 2 or 3, 1fr is too wide */
  @media (min-width: 800px) {
    --min: 240px;
    grid-template-columns: repeat(auto-fit, minmax(var(--min), 280px));
  }
  @media (min-width: 1400px) {
    padding: 0 var(--layout-paddingHorizontal-small);
    max-width: var(--maxViewportWidth);
  }
`

const CardStyle = css`
  min-width: var(--card-minWidth);
  max-width: var(--card-maxWidth);
  flex-basis: 0;
  flex-grow: 1;
`

const StyledNewsCard = styled(NewsCard)`
  ${CardStyle}
`
const StyledTopicPageCard = styled(TopicPageCard)`
  ${CardStyle}
`

const CardWrapper = styled.div`
  display: flex;
  min-width: 280px;
  width: 100%;
`

type CardProps = CardData | PeopleCardData | EventCardData

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
        return <StyledNewsCard data={data as CardData} key={data.id} />
      case 'topics':
      case 'magazine':
        return <StyledTopicPageCard data={data as CardData} key={data.id} />
      case 'people':
        return <PeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} key={data.id} />
      default:
        return console.warn('Missing card type for ', data)
    }
  }

  const { width } = useWindowSize()
  const renderScroll = useHorizontalScroll || Boolean(width && width <= 800)

  if (variant === 'promoteEvents') {
    return (
      <MultipleEventCards
        data={data as EventCardData[]}
        hasSectionTitle={hasSectionTitle}
        eventPromotionSettings={eventPromotionSettings}
        renderScroll={renderScroll}
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
              return <CardWrapper key={item.id}>{card}</CardWrapper>
            }
          })}
        </Carousel>
      </>
    )
  }

  if (variant === 'promotePeople') {
    return (
      <PeopleCardsWrapper>
        <>
          {data.map((item) => {
            return getCard(item)
          })}
        </>
      </PeopleCardsWrapper>
    )
  }

  return (
    <CardsWrapper>
      <>
        {data.map((item) => {
          return getCard(item)
        })}
      </>
    </CardsWrapper>
  )
}

export default MultiplePromotions
