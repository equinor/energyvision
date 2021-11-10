import styled from 'styled-components'
import { BackgroundContainer } from '@components'
import NewsCard from '../news/NewsCard'
import type { PromotionData } from '../../types/types'

const Wrapper = styled.div`
  padding: var(--space-xxLarge) var(--space-large);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
  /** @TODO: Clamp? */
  @media (min-width: 1300px) {
    grid-column-gap: 4rem;
  }
  @media (min-width: 1900px) {
    grid-column-gap: var(--space-4xLarge);
  }
`

const Promotion = ({ data }: { data: PromotionData }) => {
  console.log(data)
  const { articles, pages } = data.promotion
  return (
    <BackgroundContainer background={data.designOptions.background}>
      <Wrapper>{articles && articles.map((article) => <NewsCard data={article} key={article.id} />)}</Wrapper>
    </BackgroundContainer>
  )
}

export default Promotion
