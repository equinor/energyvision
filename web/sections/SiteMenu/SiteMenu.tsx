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
  const useComplex = useMediaQuery(`(min-width: 1300px)`)

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

  const getCurrentMenuItemIndex = useCallback(() => {
    return menuItems
      .findIndex((menuItem) => {
        if (variant === 'simple') {
          if ('link' in menuItem && menuItem?.link && menuItem.link.slug === router.asPath) {
            return menuItem.link.slug === router.asPath
          }
          if (
            'links' in menuItem &&
            menuItem?.links &&
            menuItem.links.some((link) => link.link?.slug === router.asPath)
          ) {
            return menuItem.links.some((link) => link.link?.slug === router.asPath)
          }
          if (
            'readMoreLink' in menuItem &&
            menuItem?.readMoreLink?.link?.slug &&
            menuItem.readMoreLink.link.slug === router.asPath
          ) {
            return menuItem.readMoreLink.link.slug === router.asPath
          }
        } else if (variant === 'default') {
          if (
            'groups' in menuItem &&
            menuItem.groups &&
            menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === router.asPath))
          ) {
            return menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === router.asPath))
          }
          if (
            'topLevelLink' in menuItem &&
            menuItem?.topLevelLink?.link?.slug &&
            menuItem?.topLevelLink?.link?.slug === router.asPath
          ) {
            return menuItem?.topLevelLink?.link?.slug === router.asPath
          }
        } else {
          return -1
        }
      })
      .toString()
  }, [menuItems, router.asPath, variant])

  const currentMenuItemIndex = useMemo(() => {
    return getCurrentMenuItemIndex()
  }, [getCurrentMenuItemIndex])

  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'h-full mt-8 xl:bg-moss-green-50 xl:mx-8 xl:flex xl:justify-between items-center',
    simple: `max-w-viewport ${
      Flags.HAS_FANCY_MENU ? '' : 'bg-north-sea-80'
    } mt-6 xl:mt-8 xl:px-layout-sm flex flex-col mx-auto`,
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
              <nav className={`${!Flags.HAS_FANCY_MENU ? 'h-full dark bg-north-sea-80' : ''} `}>
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
                      {useComplex ? (
                        <MenuPanes
                          menuItems={menuItems as SimpleGroupData[]}
                          currentMenuItemIndex={currentMenuItemIndex}
                        />
                      ) : (
                        <Menu variant="simple" defaultValue={[currentMenuItemIndex]}>
                          {menuItems.map((item, idx: number) => {
                            const nextIsSimpleLink = (menuItems[idx + 1] as SimpleGroupData)?.type === 'simpleMenuLink'
                            return (
                              <SimpleMenuItem
                                key={item.id}
                                index={idx}
                                item={item as SimpleGroupData}
                                nextIsSimpleLink={nextIsSimpleLink}
                              />
                            )
                          })}
                        </Menu>
                      )}
                    </>
                  ) : (
                    <Menu variant="default" defaultValue={useComplex ? currentMenuItemIndex : [currentMenuItemIndex]}>
                      {menuItems.map((item, idx: number) => {
                        return <MenuItem key={item.id} index={idx} item={item as SubMenuData} />
                      })}
                    </Menu>
                  )}
                  {
                    <hr
                      className={`${
                        Flags.HAS_FANCY_MENU ? 'xl:hidden mt-12' : 'max-xl:mt-8'
                      } h-[1px] w-full bg-grey-40 dark:bg-white-100`}
                    />
                  }
                  <BaseLink
                    className={`
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
                    max-xl:px-layout-sm
                    ${
                      variant === 'simple'
                        ? 'max-xl:ml-2 py-4 xl:py-6 text-md hover:text-north-sea-50'
                        : `py-6 
                        px-2
                        text-md
                        xl:px-6
                        xl:my-4
                        xl:py-4
                        xl:text-sm
                        xl:border-l
                        xl:border-white-100
                        `
                    }
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
