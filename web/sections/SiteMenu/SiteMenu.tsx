import { useEffect, useCallback, useState, useMemo } from 'react'
import { useFloating, useInteractions, useDismiss, FloatingOverlay, FloatingFocusManager } from '@floating-ui/react'
import { useRouter } from 'next/router'
import { Menu, MenuButton } from '@core/MenuAccordion'
import { TopbarDropdown } from './TopbarDropdown'
import { NavTopbar } from './NavTopbar'
import { getAllSitesLink } from '../../common/helpers/getAllSitesLink'
import { BaseLink, LogoLink } from '@core/Link'
import type { MenuData, SimpleGroupData, SimpleMenuData, SubMenuData } from '../../types/index'
import { FormattedMessage, useIntl } from 'react-intl'
import { Flags } from '../../common/helpers/datasetHelpers'
import { MenuPanes } from '@core/MenuPanes/MenuPanes'
import { MenuItem } from './MenuItem'
import { ArrowRight } from '../../icons'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
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
  const usePaneMenu = useMediaQuery(`(min-width: 1300px)`)

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
  const allSitesURL = getAllSitesLink(Flags.IS_GLOBAL_PROD ? 'internal' : 'external', router?.locale || 'en')

  const getCurrentMenuItemIndex = () => {
    return menuItems
      .findIndex((menuItem) => {
        if (variant === 'simple') {
          if ('link' in menuItem && menuItem?.link) {
            return menuItem.link.slug === router.asPath
          }
          if ('links' in menuItem && menuItem?.links) {
            return menuItem.links.some((link) => link.link?.slug === router.asPath)
          }
        } else if (variant === 'default' && 'groups' in menuItem && menuItem.groups) {
          return menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === router.asPath))
        } else {
          return -1
        }
      })
      .toString()
  }

  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'h-full px-8 xl:bg-moss-green-50 xl:mt-8 xl:mx-8 xl:flex xl:justify-between items-center',
    simple: `max-w-viewport ${
      !Flags.IS_GLOBAL_PROD ? 'bg-north-sea-80' : ''
    } px-layout-sm mt-6 xl:mt-8 flex flex-col mx-auto`,
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
              <nav className={`${!Flags.IS_GLOBAL_PROD ? 'h-full dark bg-north-sea-80' : ''} `}>
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
                  {variant === 'simple' ? (
                    <>
                      {usePaneMenu ? (
                        <MenuPanes menuItems={menuItems as SimpleGroupData[]} />
                      ) : (
                        <Menu variant="simple" defaultValue={getCurrentMenuItemIndex()}>
                          {menuItems.map((item, idx: number) => {
                            return <SimpleMenuItem key={item.id} index={idx} item={item as SimpleGroupData} />
                          })}
                        </Menu>
                      )}
                    </>
                  ) : (
                    <Menu variant="default" defaultValue={getCurrentMenuItemIndex()}>
                      {menuItems.map((item, idx: number) => {
                        return <MenuItem key={item.id} index={idx} item={item as SubMenuData} />
                      })}
                    </Menu>
                  )}
                  {
                    <hr
                      className={`${
                        Flags.IS_GLOBAL_PROD ? 'xl:hidden' : ''
                      } h-[1px] w-full bg-slate-80 dark:bg-white-100 mt-8 mb-6`}
                    />
                  }
                  <BaseLink
                    className={`
                    ${
                      variant === 'simple'
                        ? 'py-4 xl:py-6 text-md hover:text-north-sea-50'
                        : `py-6 
                        px-2
                        text-md
                        xl:px-6
                        xl:my-4
                        xl:py-4
                        xl:text-sm
                        `
                    }
                    w-fit 
                    inline-flex
                    items-center
                    gap-2
                    leading-none
                    no-underline 
                    hover:underline
                    underline-offset-2
                    h-fit
                    rounded-sm
                    mb-40
                    `}
                    type={Flags.IS_GLOBAL_PROD ? 'internalUrl' : 'externalUrl'}
                    href={allSitesURL}
                  >
                    <FormattedMessage id="all_sites" defaultMessage="All sites" />
                    {!Flags.IS_GLOBAL_PROD && (
                      <ArrowRight className="ml-0.5 text-gray-500 group-hover:text-moss-green-90 transform -translate-y-0.5 rotate-[-50deg]" />
                    )}
                  </BaseLink>
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
