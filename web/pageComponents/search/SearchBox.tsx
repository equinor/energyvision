import { useEffect, useRef, useState, ChangeEvent, ComponentProps, useContext } from 'react'
import { useSearchBox, UseSearchBoxProps, UseSortByProps } from 'react-instantsearch-hooks-web'
import ControlledSearchBox from './ControlledSearchBox'
import { SearchContext } from './SearchContext'

const DEBOUNCE_TIME = 300

export type SearchBoxProps = ComponentProps<'div'> & UseSearchBoxProps

let timerId: any = undefined

const queryHook: UseSearchBoxProps['queryHook'] = (query, search) => {
  if (timerId) {
    clearTimeout(timerId)
  }
  timerId = setTimeout(() => search(query), DEBOUNCE_TIME)
}

export function SearchBox(props: SearchBoxProps) {
  // I don't think we need iSearchStalled when we don't have a manual reset button and/or loading
  // spinner if search is slow? Do we need a spinner if this happens?
  const { query, refine /* isSearchStalled */, clear } = useSearchBox({ ...props, queryHook })
  const [value, setValue] = useState(query)
  const { userTyped, setUserTyped } = useContext(SearchContext)
  const inputRef = useRef<HTMLInputElement>(null)

  function onReset() {
    setValue('')
    clear()
    setUserTyped(false)
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setUserTyped(true)
    setValue(event.currentTarget.value)
    refine(event.currentTarget.value)
  }

  useEffect(() => {
    setValue(query)
  }, [query])

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
