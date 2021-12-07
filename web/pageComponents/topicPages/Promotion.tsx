import styled, { css } from 'styled-components'
import { BackgroundContainer } from '@components'
import NewsCard from '../cards/NewsCard'
import TopicPageCard from '../cards/TopicPageCard'
import PeopleCard from '../cards/PeopleCard/PeopleCard'
import EventsCard from '../cards/EventsCard'
import SinglePromotion from './SinglePromotion'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer } from '../../common/serializers'
import type { PromotionData, CardData, PeopleCardData, EventCardData } from '../../types/types'

const Wrapper = styled.div`
  padding: var(--space-3xLarge) 0;
  --card-maxWidth: 400px;
  --card-minWidth: 200px;
`

const Intro = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
`

const StyledHeading = styled(TitleBlockRenderer)`
  text-align: center;
  margin-bottom: var(--space-xLarge);
`

const CardsWrapper = styled.div`
  width: 100%;
  max-width: calc(var(--card-maxWidth) * 3 + var(--space-large) * 2);
  padding: 0 var(--space-xxLarge);
  margin: auto;
  margin-top: var(--space-xLarge);
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
const StyledPeopleCard = styled(PeopleCard)`
  ${CardStyle}
  /* Not the best approach, should be improved */
  --card-maxWidth: 300px;
`

const StyledEventsCard = styled(EventsCard)`
  ${CardStyle}
  --card-maxWidth: 520px;
  --card-minWidth: 380px;
`

type CardProps = CardData | PeopleCardData | EventCardData

const Promotion = ({ data }: { data: PromotionData }) => {
  const { title, ingress, content, designOptions } = data
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []

  const getCard = (data: CardProps) => {
    switch (data.type) {
      case 'news':
        return <StyledNewsCard data={data as CardData} key={data.id} />
      case 'topics':
        return <StyledTopicPageCard data={data as CardData} key={data.id} />
      case 'people':
        return <StyledPeopleCard data={data as PeopleCardData} hasSectionTitle={!!title} key={data.id} />
      case 'events':
        return <StyledEventsCard data={data as EventCardData} hasSectionTitle={!!title} key={data.id} />
      default:
        return console.warn('Missing card type for ', data)
    }
  }
  return (
    <BackgroundContainer background={designOptions?.background}>
      <Wrapper>
        <Intro>
          {title && (
            <SimpleBlockContent
              blocks={title}
              serializers={{
                types: {
                  block: (props) => <StyledHeading level="h2" size="xl" {...props} />,
                },
              }}
            />
          )}
          {ingress && (
            <SimpleBlockContent
              blocks={ingress}
              serializers={{
                types: {
                  block: (props) => <IngressBlockRenderer centered={true} {...props} />,
                },
              }}
            ></SimpleBlockContent>
          )}
        </Intro>
        {promotions?.length === 1 ? (
          /*  TODO: More than just people and events */
          <SinglePromotion promotion={promotions[0]} hasSectionTitle={!!title} />
        ) : (
          <CardsWrapper>
            {promotions.map((item) => {
              return getCard(item)
            })}
          </CardsWrapper>
        )}
      </Wrapper>
    </BackgroundContainer>
  )
}

export default Promotion
