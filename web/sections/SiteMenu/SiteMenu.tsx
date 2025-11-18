'use client'
import { useCallback, useState, useMemo, useEffect } from 'react'
import {
  useFloating,
  useInteractions,
  useDismiss,
  FloatingOverlay,
  FloatingFocusManager,
  OpenChangeReason,
} from '@floating-ui/react'
import { usePathname } from 'next/navigation'
import { Menu, MenuButton } from '@/core/MenuAccordion'
import { TopbarDropdown } from './TopbarDropdown'
import { NavTopbar } from './NavTopbar'
import { BaseLink } from '@/core/Link'
import type { MenuData, SimpleGroupData, SimpleMenuData, SubMenuData } from '../../types/index'
import { useLocale, useTranslations } from 'next-intl'
import { MenuPanes } from '@/core/MenuPanes/MenuPanes'
import { MenuItem } from './MenuItem'
import { ArrowRight } from '../../icons'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { SimpleMenuItem } from './SimpleMenuItem'
import { getAllSitesLink } from '@/lib/helpers/getAllSitesLink'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { LogoLink } from '@/core/Link/LogoLink'

export type Variants = 'default' | 'simple'

export type MenuProps = {
  data?: MenuData | SimpleMenuData
  variant?: Variants
}

const SiteMenu = ({ data, variant = 'default', ...rest }: MenuProps) => {
  const pathname = usePathname()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const intl = useTranslations()
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean, event?: Event, reason?: OpenChangeReason) => {
      console.log('onOpenChange open', open)
      console.log('onOpenChange reason', reason)
      setIsOpen(!isOpen)
    },
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([useDismiss(context)])
  const useComplex = useMediaQuery(`(min-width: 1300px)`)

  const menuItems = useMemo(() => {
    if (!data) {
      return []
    }
    return data && variant === 'simple' ? (data as SimpleMenuData).groups : (data as MenuData).subMenus
  }, [data, variant])

  /*   useEffect(() => {
    console.log('closing ')
    setIsOpen(false)
  }, [pathname, setIsOpen]) */

  const title = intl('menu')
  const allSitesURL = getAllSitesLink(Flags.IS_GLOBAL_PROD ? 'internal' : 'external', locale || 'en')

  const getCurrentMenuItemIndex = useCallback(() => {
    return menuItems
      ?.findIndex((menuItem) => {
        if (variant === 'simple') {
          if ('link' in menuItem && menuItem?.link && menuItem.link.slug === pathname) {
            return menuItem.link.slug === pathname
          }
          if ('links' in menuItem && menuItem?.links && menuItem.links.some((link) => link.link?.slug === pathname)) {
            return menuItem.links.some((link) => link.link?.slug === pathname)
          }
          if (
            'readMoreLink' in menuItem &&
            menuItem?.readMoreLink?.link?.slug &&
            menuItem.readMoreLink.link.slug === pathname
          ) {
            return menuItem.readMoreLink.link.slug === pathname
          }
        } else if (variant === 'default') {
          if (
            'groups' in menuItem &&
            menuItem.groups &&
            menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === pathname))
          ) {
            return menuItem.groups?.some((group) => group.links.some((link) => link.link?.slug === pathname))
          }
          if (
            'topLevelLink' in menuItem &&
            menuItem?.topLevelLink?.link?.slug &&
            menuItem?.topLevelLink?.link?.slug === pathname
          ) {
            return menuItem?.topLevelLink?.link?.slug === pathname
          }
        } else {
          return -1
        }
      })
      .toString()
  }, [menuItems, pathname, variant])

  const currentMenuItemIndex = useMemo(() => {
    return getCurrentMenuItemIndex()
  }, [getCurrentMenuItemIndex])

  const variantClassName: Partial<Record<Variants, string>> = {
    default: 'h-full mt-8 xl:bg-moss-green-50 xl:mx-8 xl:flex xl:justify-between items-center',
    simple: ` ${Flags.HAS_FANCY_MENU ? '' : 'bg-north-sea-80'} mt-6 xl:mt-8 xl:px-layout-sm flex flex-col mx-auto`,
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
              <nav className={`${!Flags.HAS_FANCY_MENU ? 'dark h-full bg-north-sea-80' : ''} `}>
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
                        Flags.HAS_FANCY_MENU ? 'mt-12 xl:hidden' : 'max-xl:mt-8'
                      } bg-grey-40 h-[1px] w-full dark:bg-white-100`}
                    />
                  }
                  <BaseLink
                    className={`mb-40 inline-flex h-fit w-fit items-center gap-2 rounded-xs leading-none no-underline underline-offset-2 hover:underline max-xl:px-layout-sm ${
                      variant === 'simple'
                        ? 'py-4 text-md hover:text-north-sea-50 max-xl:ml-2 xl:py-6'
                        : `px-2 py-6 text-md xl:my-4 xl:border-l xl:border-white-100 xl:px-6 xl:py-4 xl:text-sm`
                    } `}
                    type={Flags.IS_GLOBAL_PROD ? 'internalUrl' : 'externalUrl'}
                    href={allSitesURL}
                  >
                    {intl('all_sites')}
                    {!Flags.IS_GLOBAL_PROD && (
                      <ArrowRight className="ml-0.5 -translate-y-0.5 rotate-[-50deg] transform text-gray-500 group-hover:text-moss-green-90" />
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
