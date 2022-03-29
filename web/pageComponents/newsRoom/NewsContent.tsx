import styled from 'styled-components'
import NewsList from './NewsList'
import Filters from './Filters'

const NewsRoomContent = styled.div`
  display: grid;
  grid-template-areas:
    'filter'
    '.'
    'list'
    '.';

  grid-template-rows: auto var(--space-xLarge) auto var(--space-xLarge);

  @media (min-width: 800px) {
    grid-template-columns: minmax(auto, var(--layout-maxContent-narrow)) minmax(var(--space-xLarge), 1fr) 30% var(
        --space-medium
      );
    grid-template-areas: 'list . filter .';
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
