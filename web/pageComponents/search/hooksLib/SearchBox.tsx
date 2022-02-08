import { useEffect, useRef, useState } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks'
import styled from 'styled-components'

import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

const Input = styled.input`
  background-color: var(--slate-blue-95);
  border: 1px solid var(--moss-green-50);
  padding: var(--space-medium) var(--space-medium) var(--space-medium) var(--space-xLarge);
  width: 100%;
  color: var(--white-100);
  /* Assuming this is not a real button */
  background: transparent
    url("data:image/svg+xml,%3Csvg height='24px' width='24px' fill='white' viewBox='0 0 24 24' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath data-testid='eds-icon-path' d='M14.966 14.255h.79l4.99 5-1.49 1.49-5-4.99v-.79l-.27-.28a6.471 6.471 0 0 1-4.23 1.57 6.5 6.5 0 1 1 6.5-6.5c0 1.61-.59 3.09-1.57 4.23l.28.27zm-9.71-4.5c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5-4.5 2.01-4.5 4.5z' height='24' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")
    no-repeat var(--space-small) center;

  &[type='search']::placeholder {
    /* I'm not 100% convinced that the placeholder color should be the same as the color */
    color: var(--white-100);
  }

  /* So, according to the spec, text input will always have focus no matter which device */
  &:focus-visible {
    ${outlineTemplate(outline)}
    outline-color: var(--energy-red-90);
  }
  /* Is the blinking cursor enough */
  &:focus {
    outline: none;
  }
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
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <Input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          /* @TODO: Text snippet */
          placeholder="Search"
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
