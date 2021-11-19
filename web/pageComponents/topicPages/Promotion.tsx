import styled, { css } from 'styled-components'
import { BackgroundContainer } from '@components'
import NewsCard from '../cards/NewsCard'
import TopicPageCard from '../cards/TopicPageCard'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer } from '../../common/serializers'
import type { PromotionData, CardData } from '../../types/types'

const Wrapper = styled.div`
  padding: var(--space-3xLarge) var(--space-xxLarge);

  --card-maxWidth: 400px;
  --card-minWidth: 200px;
`

const StyledHeading = styled(TitleBlockRenderer)`
  text-align: center;
  margin-bottom: var(--space-xLarge);
`

const CardsWrapper = styled.div`
  width: 100%;
  max-width: calc(var(--card-maxWidth) * 3 + var(--space-large) * 2);
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

const Promotion = ({ data }: { data: PromotionData }) => {
  const { title, ingress, content, designOptions } = data
  // const { articles = [], pages = [] } = data.promotion
  const promotions = content?.promotions || []

  const getCard = (data: CardData) => {
    switch (data.type) {
      case 'news':
        return <StyledNewsCard data={data} />
      case 'topics':
        return <StyledTopicPageCard data={data} />
      default:
        return console.warn('Missing card type for ', data)
    }
  }
  return (
    <BackgroundContainer background={designOptions.background}>
      <Wrapper>
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
        {promotions.length > 0 && (
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
