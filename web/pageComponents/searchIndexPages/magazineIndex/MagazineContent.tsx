import styled from 'styled-components'
import List from '../common/List'
import Filters from '../common/Filters'

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

const MagazineStoryContent = ({ hasFilters = true, hasSearch = true }) => {
  return (
    <MagazineContent>
      {(hasFilters || hasSearch) && (
        <GridFilters hasFilters={hasFilters} hasSearch={hasSearch} filterType="magazine"></GridFilters>
      )}
      <GridList filterType="magazine"></GridList>
    </MagazineContent>
  )
}

export default MagazineStoryContent
