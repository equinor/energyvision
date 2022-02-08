import { InstantSearch } from 'react-instantsearch-hooks'
import { searchClient } from '../../../lib/algolia'
import SearchBox from './SearchBox'
import Hits from './Hits'
import Hit from './Hit'

const Search = () => {
  // @TODO: Don't hard code it like this
  if (searchClient.appId === '') {
    console.warn('You need to add an app id for Algolia search')
    return null
  }
  console.log(searchClient)
  const testIndex = `dev_EVENTS_en-GB`

  return (
    <InstantSearch searchClient={searchClient} indexName={testIndex}>
      {/*  <Configure hitsPerPage={5} snippetEllipsisText=" ..." /> */}

      <SearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}

export default Search
