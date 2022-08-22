import styled from 'styled-components'
import NewsList from './List'
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

const NewsContent = ({ hasFilters = true, hasSearch = true, header = 'news' }) => {
  return (
    <NewsRoomContent>
      {(hasFilters || hasSearch || header) && (
        <GridFilters hasFilters={hasFilters} hasSearch={hasSearch} header={header}></GridFilters>
      )}
      <GridNewsList header={header}></GridNewsList>
    </NewsRoomContent>
  )
}

export default NewsContent
