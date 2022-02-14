import { /* useEffect, useCallback, */ useState } from 'react'
import styled from 'styled-components'
import { useRouter, NextRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'
import FocusLock from 'react-focus-lock'
import { Button } from '@components'
import { Icon } from '@equinor/eds-core-react'
import { search, close } from '@equinor/eds-icons'
import Search from '../Search'
import NewSearch from './Search'

/** @TODO Move and refactor */
import { TopbarDropdown } from '../../shared/siteMenu/TopbarDropdown'
import { NavTopbar } from '../../shared/siteMenu/NavTopbar'

import { LogoLink } from '../../shared/LogoLink'

const StyledButton = styled(Button)`
  color: var(--default-text);
  fill: var(--default-text);
`

const InvertedButton = styled(Button)`
  fill: var(--inverted-text);
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
// Temp.! Refactor, rethink, whatever
const getSearchState = (router: NextRouter) => {
  const { query: routerQuery } = router
  const { query, page } = routerQuery

  if (!query || Array.isArray(query)) {
    return {}
  }

  return {
    page,
    query,
  }
}

const SiteMenu = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const searchState = getSearchState(router)

  //const handleRouteChange = useCallback((url) => {
  // console.log('Route changed will change to', url, router.pathname)
  // @TODO: Maybe we should not listen to router.events in this case
  // since we will do a lot with the query params. I think it's a better approach
  // to change the setIsOpen only when somebody clicks the X button or click a link
  // in a hit. But in that case, we need to do something clever to restore the
  // state on browser back
  // }, [])

  /*  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router.events, handleRouteChange])
 */
  function onCloseButtonClick() {
    setIsOpen(!isOpen)
  }

  // @TODO Lot's of todo
  const setSearchState = (/* newSearchState */) => {
    //_setSearchState(newSearchState, router);
  }

  return (
    <>
      <StyledButton variant="ghost_icon" aria-expanded={isOpen} onClick={onCloseButtonClick} aria-label="Search">
        <Icon size={32} data={search} />
      </StyledButton>
      <FocusLock disabled={!isOpen} returnFocus>
        <RemoveScroll enabled={isOpen}>
          <DarkTopbarDropdown isOpen={isOpen}>
            <NavTopbar>
              <LogoLink />
              <InvertedButton
                variant="ghost_icon"
                aria-expanded={isOpen}
                onClick={onCloseButtonClick}
                aria-label="Search"
              >
                <Icon size={32} data={close} />
              </InvertedButton>
            </NavTopbar>
            <SearchContainer>
              <NewSearch setIsOpen={setIsOpen} />
              <Search setSearchState={setSearchState} searchState={searchState} />
            </SearchContainer>
          </DarkTopbarDropdown>
        </RemoveScroll>
      </FocusLock>
    </>
  )
}
export default SiteMenu
