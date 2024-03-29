// The simple variant for the menu is used by the satellite sites

import { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { SimpleMenuWrapper } from './SimpleMenuWrapper'
import { MenuButton, Link } from '@components'
import { SimpleMenuItem } from './SimpleMenuItem'
import { getAllSitesLink } from '../../../../common/helpers/getAllSitesLink'

import type { SimpleMenuData, SimpleGroupData } from '../../../../types/types'

import { TopbarDropdown } from '../TopbarDropdown'
import { LogoLink } from '../../LogoLink'
import { NavTopbar } from '../NavTopbar'
import { FloatingFocusManager, FloatingOverlay, useDismiss, useFloating, useInteractions } from '@floating-ui/react'

const MenuContainer = styled.div`
  font-size: var(--typeScale-1);
  background-color: transparent;
  padding: 0 var(--space-large);
`

// TODO: This needs to be looked at. Not optimal solution.
const MenuLink = styled(Link)`
  font-size: var(--typeScale-1);
  padding: calc(var(--space-small) + var(--space-small)) 0;
  svg {
    display: none;
  }
  &:hover {
    background-color: var(--grey-10);
  }
`
const AllSitesLink = styled(Link)`
  text-decoration: none;
  padding: calc(var(--space-small) + var(--space-small)) 0;
  &:hover {
    text-decoration: underline;
  }
`

export type MenuProps = {
  data?: SimpleMenuData
}

const SimpleSiteMenu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const menuItems = (data && data.groups) || []
  const intl = useIntl()
  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([useDismiss(context)])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  function onMenuButtonClick() {
    setIsOpen(!isOpen)
  }

  const title = intl.formatMessage({ id: 'menu', defaultMessage: 'Menu' })
  const allSitesURL = getAllSitesLink('external')

  return (
    <>
      <MenuButton
        ref={refs.setReference}
        {...getReferenceProps()}
        title={title}
        aria-expanded={isOpen}
        onClick={onMenuButtonClick}
        aria-haspopup={true}
        {...rest}
      />
      {isOpen && (
        <FloatingFocusManager context={context}>
          <FloatingOverlay ref={refs.setFloating} lockScroll {...getFloatingProps()}>
            <TopbarDropdown>
              <nav>
                <NavTopbar>
                  <LogoLink />
                  <MenuButton title={title} aria-expanded={true} expanded onClick={() => setIsOpen(false)}></MenuButton>
                </NavTopbar>
                <MenuContainer>
                  <SimpleMenuWrapper>
                    {menuItems?.map((item: SimpleGroupData, idx: number) => {
                      if (item?.type === 'simpleMenuGroup') {
                        return <SimpleMenuItem item={item} key={item.id} index={idx} />
                      } else if (item?.type === 'simpleMenuLink') {
                        // Is this really necessary?
                        if (item.link && !item.link.slug) {
                          console.warn('Missing slug for simple menu link')
                        }
                        return (
                          <li key={item.id}>
                            <MenuLink variant="contentLink" href={(item.link && item.link.slug) || '/'}>
                              {' '}
                              {item.label}{' '}
                            </MenuLink>
                          </li>
                        )
                      }
                    })}
                    <AllSitesLink href={allSitesURL}>
                      <FormattedMessage id="all_sites" defaultMessage="All sites" />
                    </AllSitesLink>
                  </SimpleMenuWrapper>
                </MenuContainer>
              </nav>
            </TopbarDropdown>
          </FloatingOverlay>
        </FloatingFocusManager>
      )}
    </>
  )
}
export default SimpleSiteMenu
