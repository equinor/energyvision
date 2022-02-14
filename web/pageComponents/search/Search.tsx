import { useState } from 'react'
import { InstantSearch, Configure /* InstantSearchProps */ } from 'react-instantsearch-dom'
import { searchClient } from '../../lib/algolia'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

type SearchProps = {
  setSearchState: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchState?: any
}

// ZOMG
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Search = ({ setSearchState, searchState }: SearchProps) => {
  const [internalSearchState, setInternalSearchState] = useState(searchState)

  const testIndex = `EVENTS`

  // This is the old version of the Algolia lib, doesn't make sens spend time on typing this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSearchStateChange = (newSearchState: any) => {
    // @TODO: Lot's of state in wrapper components
    setInternalSearchState(newSearchState)
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={testIndex}
      searchState={internalSearchState}
      onSearchStateChange={onSearchStateChange}
    >
      <Configure hitsPerPage={5} snippetEllipsisText=" ..." />

      <SearchBox />
      <SearchResults />
    </InstantSearch>
  )
}

export default Search
