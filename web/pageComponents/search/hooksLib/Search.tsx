import { InstantSearch } from 'react-instantsearch-hooks'
import { searchClient } from '../../../lib/algolia'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

type SearchProps = {
  setIsOpen: (arg0: boolean) => void
}

const Search = ({ setIsOpen }: SearchProps) => {
  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('You need to add an app id for Algolia search')
    return null
  }
  const testIndex = `dev_EVENTS_en-GB`

  return (
    <InstantSearch searchClient={searchClient} indexName={testIndex}>
      {/*  <Configure hitsPerPage={5} snippetEllipsisText=" ..." /> */}

      <SearchBox />
      <SearchResults setIsOpen={setIsOpen} />
    </InstantSearch>
  )
}

export default Search
