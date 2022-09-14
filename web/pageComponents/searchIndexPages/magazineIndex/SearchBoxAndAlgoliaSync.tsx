import { useContext, useEffect } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web'
import { SearchBoxContext } from './SearchBoxContext'

export type SearchBoxProps = UseSearchBoxProps

export const SearchBoxAndAlgoliaSync = (props: SearchBoxProps) => {
  const { inputValue, setInputValue, inputRef } = useContext(SearchBoxContext)
  // @TODO Cannot figure out exactly what this isSearchStalled is supposed to do
  const { query, refine /* isSearchStalled */ } = useSearchBox(props)
  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // Bypass the state update if the input is focused to avoid concurrent
    // updates when typing.

    if (document.activeElement !== inputRef?.current && query !== inputValue) {
      setInputValue(query)
    }
  }, [query, inputValue])
  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    console.log(query)
    console.log(inputValue)
    if (query !== inputValue) {
      console.log('refine ' + inputValue)
      refine(inputValue)
    }
  }, [inputValue, refine, query])

  return null
}
