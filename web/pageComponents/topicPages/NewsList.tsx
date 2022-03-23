import styled from 'styled-components'
import NewsCard from '../cards/NewsCard'
import type { NewsListData } from '../../types/types'

const Wrapper = styled.div`
  --card-minWidth: 250px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);
  @media (min-width: 1000px) {
    --card-minWidth: 340px;
  }

  padding: 0 var(--layout-paddingHorizontal-small);
  margin: var(--space-xLarge) auto 0 auto;
  max-width: var(--maxViewportWidth);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`

const NewsList = ({ data, ...rest }: { data: NewsListData }) => {
  const { articles } = data

  return (
    <Wrapper {...rest}>
      {articles.map((article) => (
        <NewsCard data={article} key={article.id} />
      ))}
    </Wrapper>
  )

  // return <MultiplePromotions data={articles} variant="promoteNews" hasSectionTitle={false} />
}

export default NewsList
