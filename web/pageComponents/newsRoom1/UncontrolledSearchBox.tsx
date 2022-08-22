/*
 The original uncontrolled version of the search box. Currently not in use
 */

import { useEffect, useRef, useState } from 'react'
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web'
import styled from 'styled-components'
import VisuallyHidden from '../shared/VisuallyHidden'

import { useIntl } from 'react-intl'

const Input = styled.input`
  border: 1px solid var(--slate-blue-70);
  padding: var(--space-medium) var(--space-medium) var(--space-medium) var(--space-xxLarge);
  width: 100%;
  background: transparent
    url("data:image/svg+xml,%3Csvg height='24px' width='24px' fill='%238C8C8C' viewBox='0 0 24 24' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath data-testid='eds-icon-path' d='M14.966 14.255h.79l4.99 5-1.49 1.49-5-4.99v-.79l-.27-.28a6.471 6.471 0 0 1-4.23 1.57 6.5 6.5 0 1 1 6.5-6.5c0 1.61-.59 3.09-1.57 4.23l.28.27zm-9.71-4.5c0 2.49 2.01 4.5 4.5 4.5s4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5-4.5 2.01-4.5 4.5z' height='24' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E")
    no-repeat var(--space-small) center;
  &[type='search']::placeholder {
    color: var(--grey-50);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--white-100);
  }
  &:focus::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: all;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    background: transparent
      url("data:image/svg+xml,%0A%3Csvg width='32' height='32' stroke='%238C8C8C' viewBox='0 0 32 32'  xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='1.25' y1='-1.25' x2='34.75' y2='-1.25' transform='matrix(0.681232 0.732068 -0.675487 0.737372 2.50415 3.58887)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.75' y2='-1.25' transform='matrix(0.681232 0.732068 -0.675487 0.737372 2.50415 3.58887)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.7506' y2='-1.25' transform='matrix(0.681238 -0.732062 0.675483 0.737376 4.4751 30.3545)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cline x1='1.25' y1='-1.25' x2='34.7506' y2='-1.25' transform='matrix(0.681238 -0.732062 0.675483 0.737376 4.4751 30.3545)'  stroke-width='2.5' stroke-linecap='round'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_4304_84678' x1='18' y1='0' x2='18' y2='1' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_4304_84678' x1='18.0003' y1='0' x2='18.0003' y2='1' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A")
      no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }
`

export type SearchBoxProps = UseSearchBoxProps

const UncontrolledSearchBox = (props: SearchBoxProps) => {
  // @TODO Cannot figure out exactly what this isSearchStalled is supposed to do
  const { query, refine /* isSearchStalled */ } = useSearchBox(props)
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

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

  const search = intl.formatMessage({ id: 'search', defaultMessage: 'Search' })

  return (
    <div>
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <VisuallyHidden as="label" htmlFor="site-search">
          {search}
        </VisuallyHidden>
        <Input
          id="site-search"
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={search}
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

export default UncontrolledSearchBox
