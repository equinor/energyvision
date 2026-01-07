'use client'
import {
  FloatingFocusManager,
  FloatingOverlay,
  type OpenChangeReason,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'
import { usePage } from '@/contexts/pageContext'
import BaseLink from '@/core/Link/BaseLink'
import { LogoLink } from '@/core/Link/LogoLink'
import { Menu, MenuButton } from '@/core/MenuAccordion'
import { MenuPanes } from '@/core/MenuPanes/MenuPanes'
import { getAllSitesLink } from '@/lib/helpers/getAllSitesLink'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import { ArrowRight } from '../../icons'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import type {
  MenuData,
  SimpleGroupData,
  SimpleMenuData,
  SubMenuData,
} from '../../types/index'
import { MenuItem } from './MenuItem'
import { NavTopbar } from './NavTopbar'
import { SimpleMenuItem } from './SimpleMenuItem'
import { TopbarDropdown } from './TopbarDropdown'

export type Variants = 'default' | 'simple'

export type MenuProps = {
  variant?: Variants
}

const SiteMenu = ({ variant = 'default', ...rest }: MenuProps) => {
  const { siteMenuData } = usePage()
  const pathname = usePathname()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const intl = useTranslations()
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean, event?: Event, reason?: OpenChangeReason) => {
      setIsOpen(!isOpen)
    },
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
  ])
  const useComplex = useMediaQuery(`(min-width: 1300px)`)

  const menuItems = useMemo(() => {
    if (!siteMenuData) {
      return []
    }
    return siteMenuData && variant === 'simple'
      ? (siteMenuData as SimpleMenuData).groups
      : (siteMenuData as MenuData).subMenus
  }, [siteMenuData, variant])

  /*   useEffect(() => {
    console.log('closing ')
    setIsOpen(false)
  }, [pathname, setIsOpen]) */

  const title = intl('menu')
  const allSitesURL = getAllSitesLink(
    Flags.IS_GLOBAL_PROD ? 'internal' : 'external',
    locale || 'en',
  )

  const getCurrentMenuItemIndex = useCallback(() => {
    return menuItems
      ?.findIndex(menuItem => {
        if (variant === 'simple') {
          if (
            'link' in menuItem &&
            menuItem?.link &&
            menuItem.link.slug === pathname
          ) {
            return menuItem.link.slug === pathname
          }
          if (
            'links' in menuItem &&
            menuItem?.links &&
            menuItem.links.some(link => link.link?.slug === pathname)
          ) {
            return menuItem.links.some(link => link.link?.slug === pathname)
          }
          if (
            'readMoreLink' in menuItem &&
            menuItem?.readMoreLink?.link?.slug &&
            menuItem.readMoreLink.link.slug === pathname
          ) {
            return menuItem.readMoreLink.link.slug === pathname
          }
        } else variant === 'default'
        if (
          'groups' in menuItem &&
          menuItem.groups &&
          menuItem.groups?.some(group =>
            group.links.some(link => link.link?.slug === pathname),
          )
        ) {
          return menuItem.groups?.some(group =>
            group.links.some(link => link.link?.slug === pathname),
          )
        }
        if (
          'topLevelLink' in menuItem &&
          menuItem?.topLevelLink?.link?.slug &&
          menuItem?.topLevelLink?.link?.slug === pathname
        ) {
          return menuItem?.topLevelLink?.link?.slug === pathname
        }
        return false
      })
      .toString()
  }, [menuItems, pathname, variant])

  const currentMenuItemIndex = useMemo(() => {
    return getCurrentMenuItemIndex()
  }, [getCurrentMenuItemIndex])

  const variantClassName: Partial<Record<Variants, string>> = {
    default:
      'h-full mt-8 xl:bg-moss-green-50 xl:mx-8 xl:flex xl:justify-between items-center',
    simple: ` ${Flags.HAS_FANCY_MENU ? '' : 'bg-north-sea-80'} mt-6 xl:mt-8 xl:px-layout-sm flex flex-col mx-auto`,
  }

  return (
    <div>
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
          <FloatingOverlay
            ref={refs.setFloating}
            lockScroll
            {...getFloatingProps()}
          >
            <TopbarDropdown>
              <nav
                className={`${!Flags.HAS_FANCY_MENU ? 'dark h-full bg-north-sea-80' : ''} `}
              >
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
                    useComplex ? (
                      <MenuPanes
                        menuItems={menuItems as SimpleGroupData[]}
                        currentMenuItemIndex={currentMenuItemIndex}
                      />
                    ) : (
                      <Menu
                        variant='simple'
                        defaultValue={[currentMenuItemIndex]}
                      >
                        {menuItems.map((item, idx: number) => {
                          const nextIsSimpleLink =
                            (menuItems[idx + 1] as SimpleGroupData)?.type ===
                            'simpleMenuLink'
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
                    )
                  ) : (
                    <Menu
                      variant='default'
                      defaultValue={
                        useComplex
                          ? currentMenuItemIndex
                          : [currentMenuItemIndex]
                      }
                    >
                      {menuItems.map((item, idx: number) => {
                        return (
                          <MenuItem
                            key={item.id}
                            index={idx}
                            item={item as SubMenuData}
                          />
                        )
                      })}
                    </Menu>
                  )}
                  {
                    <hr
                      className={`${
                        Flags.HAS_FANCY_MENU ? 'mt-12 xl:hidden' : 'max-xl:mt-8'
                      } h-px w-full bg-grey-40 dark:bg-white-100`}
                    />
                  }
                  <BaseLink
                    className={`mb-40 inline-flex h-fit w-fit items-center gap-2 rounded-xs leading-none no-underline underline-offset-2 hover:underline max-xl:px-layout-sm ${
                      variant === 'simple'
                        ? 'py-4 text-md hover:text-north-sea-50 max-xl:ml-2 xl:py-6'
                        : `px-2 py-6 text-md xl:my-4 xl:border-white-100 xl:border-l xl:px-6 xl:py-4 xl:text-sm`
                    } `}
                    type={Flags.IS_GLOBAL_PROD ? 'internalUrl' : 'externalUrl'}
                    href={allSitesURL}
                  >
                    {intl('all_sites')}
                    {!Flags.IS_GLOBAL_PROD && (
                      <ArrowRight className='-translate-y-0.5 ml-0.5 rotate-[-50deg] transform text-gray-500 group-hover:text-moss-green-90' />
                    )}
                  </BaseLink>
                </div>
              </nav>
            </TopbarDropdown>
          </FloatingOverlay>
        </FloatingFocusManager>
      )}
    </div>
  )
}

export default SiteMenu
