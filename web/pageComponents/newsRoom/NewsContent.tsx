import styled from 'styled-components'
import NewsList from './NewsList'
import Filters from './Filters'

const NewsRoomContent = styled.div`
  display: grid;
  grid-template-areas:
    'filter'
    'list';
  @media (min-width: 800px) {
    grid-template-columns: 70% 30%;
    grid-template-areas: 'list filter';
  }
`

const GridFilters = styled(Filters)`
  grid-area: filter;
`

const GridNewsList = styled(NewsList)`
  grid-area: list;
`

const NewsContent = () => {
  return (
    <NewsRoomContent>
      <GridFilters></GridFilters>
      <GridNewsList></GridNewsList>
    </NewsRoomContent>
  )
}

export default NewsContent
