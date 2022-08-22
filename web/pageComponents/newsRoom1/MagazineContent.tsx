import styled from 'styled-components'
import List from './List'
import Filters from './Filters'

const MagazineContent = styled.div`
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

const GridList = styled(List)`
  grid-area: list;
`

const MagazineStoryContent = ({ hasFilters = true, hasSearch = true, header = 'magazine' }) => {
  return (
    <MagazineContent>
      {(hasFilters || hasSearch || header) && (
        <GridFilters hasFilters={hasFilters} hasSearch={hasSearch} header={header}></GridFilters>
      )}
      <GridList header={header}></GridList>
    </MagazineContent>
  )
}

export default MagazineStoryContent
