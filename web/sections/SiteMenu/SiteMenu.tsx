import { useState, useMemo, useEffect } from 'react'
import { useFloating, useInteractions, useDismiss, FloatingOverlay, FloatingFocusManager } from '@floating-ui/react'
import { usePathname } from 'next/navigation'
import { Menu, MenuButton } from '@core/MenuAccordion'
import { MenuItem } from './MenuItem'
import { TopbarDropdown } from './TopbarDropdown'
import { NavTopbar } from './NavTopbar'
import { getAllSitesLink } from '../../common/helpers/getAllSitesLink'
import { Link, LogoLink } from '@core/Link'

import type { MenuData, SimpleGroupData, SimpleMenuData, SubMenuData } from '../../types/index'
import { FormattedMessage, useIntl } from 'react-intl'
import { SimpleMenuItem } from './SimpleMenuItem'
import { useCurrentLocale } from 'next-i18n-router/client'
import { i18nConfig } from '../../i18nConfig'
import { Flags } from '../../common/helpers/datasetHelpers'

export type Variants = 'default' | 'simple'

export type MenuProps = {
  data?: MenuData | SimpleMenuData
  variant?: Variants
}

const SiteMenu = ({ data, variant = 'default', ...rest }: MenuProps) => {
  const pathname = usePathname()
  const currentLocale = useCurrentLocale(i18nConfig)

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

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const title = intl.formatMessage({ id: 'menu', defaultMessage: 'Menu' })

  const allSitesURL = getAllSitesLink(Flags.IS_GLOBAL_PROD ? 'internal' : 'external', currentLocale || 'en')

  const getCurrentMenuItemIndex = () => {
    return menuItems
      .findIndex((menuItem) => {
        if (variant === 'simple') {
          if ('link' in menuItem && menuItem?.link) {
            return menuItem.link.slug === pathname
          }
          if ('links' in menuItem && menuItem?.links) {
            return menuItem.links.some((link) => link.link?.slug === pathname)
          }
        } else if (variant === 'default' && 'groups' in menuItem && menuItem.groups) {
          return menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === pathname))
        } else {
          return -1
        }
      })
      .toString()
  }

  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'h-full px-8 xl:bg-moss-green-50 xl:mt-8 xl:mx-8 xl:flex xl:justify-between items-center',
    simple: 'px-layout-sm flex flex-col mx-auto xl:px-layout-lg xl:w-fit',
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
                <div className={variantClassName[variant]} {...rest}>
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
                    ${
                      variant === 'simple'
                        ? 'py-4 xl:py-6 text-sm'
                        : `py-6 
                        px-2
                        xl:px-6
                        xl:my-4
                        xl:py-4
                        text-base`
                    }
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
