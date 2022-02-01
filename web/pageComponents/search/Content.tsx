import { Hits, Pagination, connectStateResults } from 'react-instantsearch-dom'
import Hit from './Hit'

export default connectStateResults(({ searchState, searchResults }) => {
  return searchState && searchState.query ? (
    searchResults && searchResults.nbHits !== 0 ? (
      <div>
        <Hits hitComponent={Hit} />
        {searchResults.nbHits > 5 ? (
          <div>
            <Pagination showLast={false} showFirst={false} />
          </div>
        ) : null}
      </div>
    ) : (
      <div>No hits</div>
    )
  ) : null
})
