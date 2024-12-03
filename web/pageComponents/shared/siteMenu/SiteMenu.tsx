import { useEffect, useCallback, useState } from 'react'
import { useFloating, useInteractions, useDismiss, FloatingOverlay, FloatingFocusManager } from '@floating-ui/react'
import { useRouter } from 'next/router'
import { Menu, MenuButton } from '@core/MenuAccordion'
import { MenuGroup } from './MenuGroup'
import { TopbarDropdown } from './TopbarDropdown'
import { MenuContainer } from './MenuContainer'
import { NavTopbar } from './NavTopbar'
import { getAllSitesLink } from '../../../common/helpers/getAllSitesLink'

import { LogoLink } from '../../../core/Link/LogoLink'
import { Link } from '@core/Link'

import type { MenuData, SubMenuData } from '../../../types/index'
import { FormattedMessage, useIntl } from 'react-intl'

export type MenuProps = {
  data?: MenuData
}

const SiteMenu = ({ data, ...rest }: MenuProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([useDismiss(context)])

  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])
  const menuItems = (data && data.subMenus) || []

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  const title = intl.formatMessage({ id: 'menu', defaultMessage: 'Menu' })
  const allSitesURL = getAllSitesLink('internal', router?.locale || 'en')

  const getCurrentMenuItemIndex = (menuItems: SubMenuData[]) => {
    return menuItems
      .findIndex((menuItem) =>
        menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === router.asPath)),
      )
      .toString()
  }

  return (
    <>
      <MenuButton
        ref={refs.setReference}
        title={title}
        {...getReferenceProps()}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
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
                  <MenuButton
                    title={title}
                    aria-haspopup={true}
                    aria-expanded={true}
                    expanded
                    onClick={() => setIsOpen(false)}
                  />
                </NavTopbar>
                <MenuContainer>
                  <Menu type="single" defaultValue={getCurrentMenuItemIndex(menuItems)}>
                    {menuItems.map((topLevelItem: SubMenuData, idx) => {
                      return <MenuGroup key={topLevelItem.id} index={idx} topLevelItem={topLevelItem} />
                    })}
                  </Menu>

                  <Link
                    className={`no-underline 
                    w-full
                    mt-4
                    text-grey-80
                    hover:bg-grey-10
                    py-6
                    md:mb-layout-md
                    xl:inline-flex
                    xl:border-l-2
                    xl:border-white-100
                    xl:w-fit
                    xl:m-0
                    xl:p-8
                    `}
                    href={allSitesURL}
                  >
                    <FormattedMessage id="all_sites" defaultMessage="All sites" />
                  </Link>
                </MenuContainer>
              </nav>
            </TopbarDropdown>
          </FloatingOverlay>
        </FloatingFocusManager>
      )}
    </>
  )
}

/* const AllSitesLink = styled(Link)`
  @media (min-width: 700px) {
    width: var(--minViewportWidth); Need this? 
  }
` */
export default SiteMenu
