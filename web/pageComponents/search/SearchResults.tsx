import { connectStateResults, Index } from 'react-instantsearch-dom'
import Stats from './Stats'
import Content from './Content'

const SearchResults = connectStateResults(({ searchResults }) => {
  return (
    <div>
      {searchResults && (
        <div>
          <Index indexName="EVENTS">
            <Stats />
          </Index>

          <Content />
        </div>
      )}
    </div>
  )
})

export default SearchResults
