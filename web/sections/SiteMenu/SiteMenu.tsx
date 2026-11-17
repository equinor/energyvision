'use client';
import {
  FloatingFocusManager,
  FloatingOverlay,
  type OpenChangeReason,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import BaseLink from '@/core/Link/BaseLink';
import Link from '@/core/Link/Link';
import { LogoLink } from '@/core/Link/LogoLink';
import { Menu, MenuButton } from '@/core/MenuAccordion';
import { MenuPanes } from '@/core/MenuPanes/MenuPanes';
import { getAllSitesLink } from '@/lib/helpers/getAllSitesLink';
import { twMerge } from '@/lib/twMerge/twMerge';
import { Flags } from '@/sanity/helpers/datasetHelpers';
import { ArrowRight } from '../../icons';
import { useMediaQuery } from '../../lib/hooks/useMediaQuery';
import type {
  MenuData,
  SimpleGroupData,
  SimpleMenuData,
  SubMenuData,
} from '../../types/index';
import { MenuItem } from './MenuItem';
import { NavTopbar } from './NavTopbar';
import { SimpleMenuItem } from './SimpleMenuItem';
import { TopbarDropdown } from './TopbarDropdown';

export type Variants = 'default' | 'simple';

export type SiteMenuProps = {
  variant?: Variants;
  siteMenuData?: MenuData | SimpleMenuData;
};

const SiteMenu = ({ variant = 'default', siteMenuData }: SiteMenuProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const intl = useTranslations();
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open: boolean, event?: Event, reason?: OpenChangeReason) => {
      setIsOpen(!isOpen);
    },
    /*     middleware: [
      size({
        apply({ rects, availableWidth, elements }) {
          // Force the floating element to be the exact same width as the reference element
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxWidth: `${availableWidth}px`, // Prevent it from exceeding the viewport
          })
        },
      }),
    ], */
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
  ]);
  const useComplex = useMediaQuery(`(min-width: 1300px)`);

  const menuItems = useMemo(() => {
    if (!siteMenuData) {
      return [];
    }
    return siteMenuData && variant === 'simple'
      ? (siteMenuData as SimpleMenuData).groups
      : (siteMenuData as MenuData).subMenus;
  }, [siteMenuData, variant]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const title = intl('menu');
  const allSitesURL = getAllSitesLink(
    Flags.IS_GLOBAL_PROD ? 'internal' : 'external',
    locale || 'en',
  );

  const getCurrentMenuItemIndex = useCallback(() => {
    const matchesPath = (slug?: string | null) =>
      Boolean(slug) && slug === pathname;

    const isTopLevelMatch = (menuItem: SimpleGroupData | SubMenuData) =>
      variant === 'simple'
        ? matchesPath((menuItem as SimpleGroupData).link?.slug)
        : matchesPath((menuItem as SubMenuData).topLevelLink?.link?.slug);

    const isNestedMatch = (menuItem: SimpleGroupData | SubMenuData) => {
      if (variant === 'simple') {
        const { links, readMoreLink } = menuItem as SimpleGroupData;
        return (
          Boolean(links?.some((link) => matchesPath(link.link?.slug))) ||
          matchesPath(readMoreLink?.link?.slug)
        );
      }
      return Boolean(
        (menuItem as SubMenuData).groups?.some((group) =>
          group.links.some((link) => matchesPath(link.link?.slug)),
        ),
      );
    };

    // A page can be linked from several menus; prefer the menu whose top-level link is the page itself
    const topLevelIndex = menuItems.findIndex(isTopLevelMatch);
    const index =
      topLevelIndex !== -1 ? topLevelIndex : menuItems.findIndex(isNestedMatch);
    return index.toString();
  }, [menuItems, pathname, variant]);

  const currentMenuItemIndex = useMemo(() => {
    return getCurrentMenuItemIndex();
  }, [getCurrentMenuItemIndex]);

  const variantClassName: Partial<Record<Variants, string>> = {
    default:
      'h-full mt-8 xl:bg-moss-green-50 xl:mx-8 xl:flex xl:justify-between items-center',
    simple: ` ${Flags.HAS_FANCY_MENU ? '' : 'bg-north-sea-80'} mt-6 xl:mt-8 xl:px-layout-sm flex flex-col mx-auto`,
  };

  if (!menuItems || menuItems.length === 0) {
    // for sites with no menu
    return (
      <Link
        className="text-base"
        type={Flags.IS_GLOBAL_PROD ? 'internalUrl' : 'externalUrl'}
        href={allSitesURL}
        onClick={handleLinkClick}
      >
        {intl('all_sites')}
      </Link>
    );
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
      />

      {isOpen && (
        <FloatingFocusManager context={context}>
          <FloatingOverlay
            ref={refs.setFloating}
            lockScroll
            {...getFloatingProps()}
          >
            <TopbarDropdown className="z-9999">
              <nav
                className={twMerge(
                  Flags.HAS_FANCY_MENU && 'w-[calc(100%-15px)] max-w-fullwidth',
                  !Flags.HAS_FANCY_MENU && 'dark h-full bg-north-sea-80',
                )}
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
                <div className={variantClassName[variant]}>
                  {variant === 'simple' ? (
                    useComplex ? (
                      <MenuPanes
                        menuItems={menuItems as SimpleGroupData[]}
                        currentMenuItemIndex={currentMenuItemIndex}
                        linkCallback={handleLinkClick}
                      />
                    ) : (
                      <Menu
                        variant="simple"
                        defaultValue={[currentMenuItemIndex]}
                      >
                        {menuItems.map((item, idx: number) => {
                          const nextIsSimpleLink =
                            (menuItems[idx + 1] as SimpleGroupData)?.type ===
                            'simpleMenuLink';
                          return (
                            <SimpleMenuItem
                              key={item.id}
                              index={idx}
                              item={item as SimpleGroupData}
                              nextIsSimpleLink={nextIsSimpleLink}
                              linkCallback={handleLinkClick}
                            />
                          );
                        })}
                      </Menu>
                    )
                  ) : (
                    <Menu
                      variant="default"
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
                            linkCallback={handleLinkClick}
                          />
                        );
                      })}
                    </Menu>
                  )}
                  {
                    <hr
                      className={`${
                        Flags.HAS_FANCY_MENU ? 'mt-12 xl:hidden' : 'max-xl:mt-8'
                      } h-px w-full text-grey-40 dark:text-white-100`}
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
                    onClick={handleLinkClick}
                  >
                    {intl('all_sites') ?? 'All sites'}
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
  );
};

export default SiteMenu;
