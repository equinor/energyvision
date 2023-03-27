import { useEffect, useRef, useState, ChangeEvent, ComponentProps, useContext } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web'
import ControlledSearchBox from './ControlledSearchBox'
import { SearchContext } from './SearchContext'
import useDebounce from '../../lib/hooks/useDebounce'

const DEBOUNCE_TIME = 300

export type SearchBoxProps = ComponentProps<'div'> & UseSearchBoxProps

export function SearchBox(props: SearchBoxProps) {
  // I don't think we need iSearchStalled when we don't have a manual reset button and/or loading
  // spinner if search is slow? Do we need a spinner if this happens?
  const { query, refine /* isSearchStalled */ } = useSearchBox(props)
  const [value, setValue] = useState(query)
  const debouncedValue = useDebounce<string>(value, DEBOUNCE_TIME)
  const { userTyped, setUserTyped } = useContext(SearchContext)
  const inputRef = useRef<HTMLInputElement>(null)

  function onReset() {
    setValue('')
    setUserTyped(false)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setUserTyped(true)
    setValue(event.currentTarget.value)
  }

  useEffect(() => {
    if (query !== debouncedValue) {
      refine(debouncedValue)
    }
    // We want to track when the value coming from the React state changes
    // to update the InstantSearch.js query, so we don't need to track the
    // InstantSearch.js query.
  }, [debouncedValue, refine, query])

  return (
    <ControlledSearchBox
      inputRef={inputRef}
      /* isSearchStalled={isSearchStalled} */
      onChange={onChange}
      onReset={onReset}
      value={value}
    />
  )
}
