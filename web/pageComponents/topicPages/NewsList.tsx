import styled from 'styled-components'
import NewsCard from '../cards/NewsCard'
import TitleText from '../shared/portableText/TitleText'
import type { NewsListData } from '../../types/types'

const Wrapper = styled.div`
  padding: 0 var(--layout-paddingHorizontal-medium);
  margin: var(--space-xLarge) auto var(--space-xLarge) auto;
  max-width: var(--maxViewportWidth);
`

const StyledHeading = styled(TitleText)`
  text-align: var(--promotion-titleAlign, center);
  margin-bottom: var(--space-xLarge);
`

const Articles = styled.div`
  --card-minWidth: 250px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);
  @media (min-width: 1000px) {
    --card-minWidth: 340px;
  }

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
`

const NewsList = ({ data, ...rest }: { data: NewsListData }) => {
  const { title, articles } = data

  return (
    <Wrapper>
      {title && <StyledHeading value={title} level="h2" size="xl" />}
      <Articles {...rest}>
        {articles.map((article) => (
          <NewsCard data={article} key={article.id} />
        ))}
      </Articles>
    </Wrapper>
  )
}

export default NewsList
