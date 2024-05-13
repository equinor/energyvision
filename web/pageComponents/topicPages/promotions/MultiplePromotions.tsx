import styled, { css } from 'styled-components'
import type {
  CardData,
  PeopleCardData,
  EventCardData,
  PromotionType,
  EventPromotionSettings,
} from '../../../types/types'
import PeopleCard from '../../cards/PeopleCard/PeopleCard'
import MultipleEventCards from './MultipleEventCards'
import { Carousel } from '../../shared/Carousel'
import { BackgroundContainer } from '@components/Backgrounds'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'
import Card from '@sections/cards/Card'
import { Ratios } from '../../../pageComponents/shared/SanityImage'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { FormattedDate } from '@components/FormattedDateTime'
import Blocks from '../../../pageComponents/shared/portableText/Blocks'

const PeopleCardsWrapper = styled.ul`
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

const TWCard = ({ slug, title, ingress, publishDateTime, heroImage }: CardData) => {
  const image = useSanityLoader(heroImage.image, 400, Ratios.NINE_TO_SIXTEEN)

  return (
    <li className="min-w-[var(--card-minWidth)] max-w-[var(--card-maxWidt)] basis-0 grow">
      <Card
        href={slug}
        {...(heroImage && {
          imageUrl: image.src,
        })}
        className="w-full h-full"
      >
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
          {ingress && <Blocks value={ingress} className="line-clamp-5 grow pb-[0.5em]" />}
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
          <li className="list-none">
            <StyledBackground key={data.id}>
              <StyledPeopleCard data={data as PeopleCardData} hasSectionTitle={hasSectionTitle} key={data.id} />
            </StyledBackground>
          </li>
        )
      default:
        return console.warn('Missing card type for ', data)
    }
  }

  const isMobile = useMediaQuery(`(max-width: 800px)`)
  const renderScroll = useHorizontalScroll || isMobile

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
    <ul className="w-full max-w-[calc(var(--card-maxWidth) * 3 + var(--space-large) * 2)] px-6 py-0 m-auto flex gap-6 justify-center content-center flex-wrap flex-col list-none md:flex-row">
      <>
        {data.map((item) => {
          return getCard(item)
        })}
      </>
    </ul>
  )
}

export default MultiplePromotions
