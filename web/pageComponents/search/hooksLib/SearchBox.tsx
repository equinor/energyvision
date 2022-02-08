import { useEffect, useRef, useState } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks'
import styled from 'styled-components'

const Input = styled.input`
  background-color: var(--slate-blue-95);
  border-style: 1px solid var(--moss-green-50);
`
export type SearchBoxProps = UseSearchBoxProps

const SearchBox = (props: SearchBoxProps) => {
  // @TODO Cannot figure out exactly what this isSearchStalled is supposed to do
  const { query, refine /* isSearchStalled */ } = useSearchBox(props)
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  function handleReset(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    setInputValue('')

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== inputValue) {
      refine(inputValue)
    }
  }, [inputValue, refine, query])

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // Bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (document.activeElement !== inputRef.current && query !== inputValue) {
      setInputValue(query)
    }
  }, [query, inputValue])

  return (
    <div>
      <form action="" className="ais-SearchBox-form" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <Input
          ref={inputRef}
          className="ais-SearchBox-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="test"
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
        />
      </form>
    </div>
  )
}

export default SearchBox
