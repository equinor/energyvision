import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { useRouter } from 'next/router'
import { Button } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { search, close } from '@equinor/eds-icons'
import Search from './Search'
import useRouterRemoveQueryParams from '../hooks/useRouterRemoveQueryParams'

/** @TODO Move and refactor */
import { TopbarDropdown } from '../shared/siteMenu/TopbarDropdown'
import { NavTopbar } from '../shared/siteMenu/NavTopbar'

import { LogoLink } from '../shared/LogoLink'

const StyledButton = styled(Button)`
  color: var(--default-text);
  fill: var(--default-text);
`

const InvertedButton = styled(Button)`
  color: var(--white-100);
  &:hover {
    color: var(--slate-blue-95);
    background-color: var(--moss-green-60);
  }
  &:focus-visible,
  &[data-focus-visible-added]:focus {
    outline-color: var(--mist-blue-100);
  }
`

const DarkTopbarDropdown = styled(TopbarDropdown)`
  background-color: var(--slate-blue-95);
  color: var(--inverted-text);
`

const SearchContainer = styled.div`
  padding: var(--space-large);
  max-width: 700px;
  margin: 0 auto;
`

const SearchOverlay = () => {
  const router = useRouter()
  const removeQueryParams = useRouterRemoveQueryParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // @TODO Do we want to open the overlay if we have a tab in query?
    if (router.query.query || router.query.query === '' || router.query.tab) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [router.query])

  const handleClose = () => {
    setIsOpen(false)
    removeQueryParams()
  }

  return (
    <>
      <StyledButton
        variant="ghost_icon"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(true)
        }}
        aria-label="Search"
      >
        <Icon size={32} data={search} />
      </StyledButton>
      <FocusLock disabled={!isOpen} returnFocus>
        <RemoveScroll enabled={isOpen}>
          <DarkTopbarDropdown isOpen={isOpen}>
            <NavTopbar>
              <LogoLink
                onClick={() => {
                  setIsOpen(false)
                }}
                inverted
              />
              <InvertedButton
                variant="ghost_icon"
                aria-expanded={isOpen}
                onClick={handleClose}
                aria-label="Close search"
              >
                <Icon size={32} data={close} />
              </InvertedButton>
            </NavTopbar>
            <SearchContainer>{isOpen && <Search setIsOpen={setIsOpen} />}</SearchContainer>
          </DarkTopbarDropdown>
        </RemoveScroll>
      </FocusLock>
    </>
  )
}
export default SearchOverlay
