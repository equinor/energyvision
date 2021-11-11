import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import NewsCard from '../news/NewsCard'
import TopicPageCard from './TopicPageCard'
import SimpleBlockContent from '../../common/SimpleBlockContent'
import { TitleBlockRenderer, IngressBlockRenderer } from '../../common/serializers'
import { blocksToText } from '../../common/helpers'
import type { PromotionData, CardData, TopicCardData } from '../../types/types'

const Wrapper = styled.div`
  padding: var(--space-3xLarge) var(--space-xxLarge);
`

const StyledHeading = styled(TitleBlockRenderer)`
  text-align: center;
  margin-bottom: var(--space-xLarge);
`

const CardsWrapper = styled.div`
  margin-top: var(--space-xLarge);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 400px));
  grid-gap: var(--space-large);
  justify-content: center;
`

const getCards = (articles: CardData[], pages: TopicCardData[]) => {
  if (articles && articles.length > 0) {
    return articles.map((article) => <NewsCard data={article} key={article.id} />)
  }

  if (pages && pages.length > 0) {
    return pages.map(({ reference, ingress }) => {
      return (
        <TopicPageCard
          data={{
            id: reference.id,
            slug: reference.slug,
            ingress: ingress,
            title: blocksToText(reference.content.title),
            heroImage: reference.content.heroImage,
          }}
          key={reference.id}
        />
      )
    })
  }

  return false
}

const Promotion = ({ data }: { data: PromotionData }) => {
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
