import { Icon } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import type { HTMLAttributes } from 'react'
import type { HeaderData } from '@/contexts/pageContext'
import ButtonLink from '@/core/Link/ButtonLink'
import { LogoLink } from '@/core/Link/LogoLink'
import { LocalizationSwitch } from '@/core/LocalizationSwitch/LocalizationSwitch'
import { defaultLanguage, languages } from '@/languageConfig'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import SiteMenu from '@/sections/SiteMenu/SiteMenu'
import { TopbarWrapper } from '@/sections/TopbarWrapper/TopbarWrapper'
import type { MenuData, SimpleMenuData } from '@/types/menuTypes'
import { StickyMenu } from '../StickyMenu/StickyMenu'

export type HeaderBarProps = {
  siteMenuData?: MenuData | SimpleMenuData
  locale?: string
  searchLabel?: string
  headerData?: HeaderData | undefined
} & HTMLAttributes<HTMLElement>

const HeaderBar = ({
  siteMenuData,
  locale = 'en_GB',
  searchLabel = 'Search',
  headerData,
}: HeaderBarProps) => {
  console.log('HeaderBar siteMenuData', siteMenuData)
  const localization = {
    activeLocale: locale ?? defaultLanguage.iso,
  }
  const hasSearch = Flags.HAS_SEARCH
  const hasMoreThanOneLanguage = languages.length > 1
  //Sticky and LocalizationSwitch is reliant on [...page] to return page data with slugs for localization and sticky menu data.
  const showSticky =
    (headerData?.stickyMenuData &&
      headerData.stickyMenuData.links.length > 0) ??
    false

  //animate-height
  return (
    <>
      <TopbarWrapper hasSticky={showSticky}>
        <LogoLink />
        <div className={`flex items-center gap-x-4 sm:gap-x-6`}>
          {hasSearch && (
            <div>
              <ButtonLink
                variant='ghost'
                aria-expanded='false'
                aria-label={searchLabel}
                href={
                  localization.activeLocale === 'nb-NO'
                    ? '/no/search'
                    : '/search'
                }
                className='clickbound-area w-full p-2 md:px-5 md:py-3'
              >
                <Icon size={24} data={search} />
                <span className='max-md:sr-only'>{searchLabel}</span>
              </ButtonLink>
            </div>
          )}
          {hasMoreThanOneLanguage && (
            <LocalizationSwitch headerData={headerData} />
          )}
          {Flags.HAS_FANCY_MENU ? (
            <SiteMenu siteMenuData={siteMenuData} />
          ) : (
            <SiteMenu variant='simple' siteMenuData={siteMenuData} />
          )}
        </div>
      </TopbarWrapper>
      {showSticky && <StickyMenu {...headerData?.stickyMenuData} />}
    </>
  )
}

export default HeaderBar
