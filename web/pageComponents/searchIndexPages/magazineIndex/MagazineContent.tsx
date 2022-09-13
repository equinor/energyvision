import styled from 'styled-components'
import { Hits } from './Hits'
import Filters from '../common/Filters'

const MagazineContent = styled.div`
  padding: 0 var(--space-xxLarge);
`

const GridFilters = styled(Filters)`
  grid-area: filter;
`

const MagazineStoryContent = ({ hasFilters = true, hasSearch = true }) => {
  return (
    <>
      <MagazineContent>
        {(hasFilters || hasSearch) && (
          <GridFilters hasFilters={hasFilters} hasSearch={hasSearch} filterType="magazine"></GridFilters>
        )}
      </MagazineContent>
      <Hits />
    </>
  )
}

export default MagazineStoryContent
