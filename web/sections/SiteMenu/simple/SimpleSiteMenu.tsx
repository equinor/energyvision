// The simple variant for the menu is used by the satellite sites

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link, LogoLink } from '@core/Link'
import { SimpleMenuItem } from '../SimpleMenuItem'

import type { SimpleMenuData, SimpleGroupData } from '../../../types/index'

import { TopbarDropdown } from '../TopbarDropdown'
import { FloatingFocusManager, FloatingOverlay, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { getAllSitesLink } from '../../../common/helpers/getAllSitesLink'
import { NavTopbar } from '../NavTopbar'
import { Menu, MenuButton } from '@core/MenuAccordion'

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
    <div>
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
                <div className="px-6">
                  <Menu orientation="vertical" className="" id="menu-accordion">
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
                            <Link
                              className="list-none no-underline w-full mt-2 mx-0 mr-0 hover:bg-grey-10 py-xs+sm"
                              href={(item.link && item.link.slug) || '/'}
                            >
                              {' '}
                              {item.label}{' '}
                            </Link>
                          </li>
                        )
                      }
                    })}
                    <Link
                      className="list-none no-underline w-full mt-2 mx-0 mr-0 hover:bg-grey-10 py-xs+sm"
                      href={allSitesURL}
                    >
                      <FormattedMessage id="all_sites" defaultMessage="All sites" />
                    </Link>
                  </Menu>
                </div>
              </nav>
            </TopbarDropdown>
          </FloatingOverlay>
        </FloatingFocusManager>
      )}
    </div>
  )
}
export default SimpleSiteMenu
