import { useEffect, useCallback, useState, useMemo } from 'react'
import { useFloating, useInteractions, useDismiss, FloatingOverlay, FloatingFocusManager } from '@floating-ui/react'
import { useRouter } from 'next/router'
import { Menu, MenuButton } from '@core/MenuAccordion'
import { MenuItem } from './MenuItem'
import { TopbarDropdown } from './TopbarDropdown'
import { NavTopbar } from './NavTopbar'
import { getAllSitesLink } from '../../common/helpers/getAllSitesLink'
import { Link, LogoLink } from '@core/Link'

import type { MenuData, SimpleGroupData, SimpleMenuData, SubMenuData } from '../../types/index'
import { FormattedMessage, useIntl } from 'react-intl'
import { SimpleMenuItem } from './SimpleMenuItem'

export type Variants = 'default' | 'simple'

export type MenuProps = {
  data?: MenuData | SimpleMenuData
  variant?: Variants
}

const SiteMenu = ({ data, variant = 'default', ...rest }: MenuProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([useDismiss(context)])

  const menuItems = useMemo(() => {
    if (!data) {
      return []
    }
    return data && variant === 'simple' ? (data as SimpleMenuData).groups : (data as MenuData).subMenus
  }, [data, variant])

  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

  const title = intl.formatMessage({ id: 'menu', defaultMessage: 'Menu' })
  const allSitesURL = getAllSitesLink('internal', router?.locale || 'en')

  const getCurrentMenuItemIndex = () => {
    const temp = menuItems
      .findIndex((menuItem) => {
        if (variant === 'simple' && 'links' in menuItem && menuItem.links) {
          return menuItem.links.some((link) => link.link?.slug === router.asPath)
        } else if (variant === 'default' && 'groups' in menuItem && menuItem.groups) {
          return menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === router.asPath))
        } else {
          return -1
        }
      })
      .toString()
    console.log('temo', temp)
    return temp
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
                <div
                  className="h-full px-8 xl:bg-moss-green-50 xl:mt-8 xl:mx-8 xl:flex xl:justify-between items-center"
                  {...rest}
                >
                  <Menu variant={variant} defaultValue={getCurrentMenuItemIndex()}>
                    {menuItems.map((item, idx: number) => {
                      return variant === 'simple' ? (
                        <SimpleMenuItem key={item.id} index={idx} item={item as SimpleGroupData} />
                      ) : (
                        <MenuItem key={item.id} index={idx} item={item as SubMenuData} />
                      )
                    })}
                  </Menu>

                  <Link
                    className={`
                    py-6
                    xl:py-4
                    px-2
                    xl:px-6
                    xl:my-4
                    text-base
                    xl:text-sm
                    leading-none
                    no-underline 
                    hover:underline
                    underline-offset-2
                    w-fit
                    h-fit
                    rounded-sm
                    xl:border-l-2
                    xl:border-white-100
                    `}
                    href={allSitesURL}
                  >
                    <FormattedMessage id="all_sites" defaultMessage="All sites" />
                  </Link>
                </div>
              </nav>
            </TopbarDropdown>
          </FloatingOverlay>
        </FloatingFocusManager>
      )}
    </>
  )
}

export default SiteMenu
