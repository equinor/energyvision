import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import NewsCard from '../news/NewsCard'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer } from '../../common/serializers'
import type { PromotionData, CardData, TopicCardData } from '../../types/types'

const Wrapper = styled.div`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-small);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(TitleBlockRenderer)`
  text-align: center;
  margin-bottom: var(--space-xLarge);
`

const CardsWrapper = styled.div`
  margin-top: var(--space-xLarge);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: var(--space-large);
`

const getCards = (articles: CardData[], pages: TopicCardData[]) => {
  if (articles && articles.length > 0) {
    return articles.map((article) => <NewsCard data={article} key={article.id} />)
  }

  if (pages && pages.length > 0) {
    // todo: refactor NewsCard to make it more generic
    return false
  }

  return false
}

const Promotion = ({ data }: { data: PromotionData }) => {
  console.log(data)
  const { title, ingress } = data
  const { articles = [], pages = [] } = data.promotion

  const cards = getCards(articles, pages)

  if (!cards) return null

  return (
    <BackgroundContainer background={data.designOptions.background}>
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
        {cards && <CardsWrapper>{cards}</CardsWrapper>}
      </Wrapper>
    </BackgroundContainer>
  )
}

export default Promotion
