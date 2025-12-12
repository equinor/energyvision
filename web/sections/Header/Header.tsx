import { Icon } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { default as NextLink } from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import type { LocaleSlug } from '@/app/[locale]/(pages)/[...slug]/page'
import { ButtonLink } from '@/core/Link'
import { LogoLink } from '@/core/Link/LogoLink'
import { LocalizationSwitch } from '@/core/LocalizationSwitch/LocalizationSwitch'
import { TopbarWrapper } from '@/core/TopbarWrapper/TopbarWrapper'
import { defaultLanguage, languages } from '@/languageConfig'
import { getAllSitesLink } from '@/lib/helpers/getAllSitesLink'
import { Flags } from '@/sanity/helpers/datasetHelpers'
import SiteMenu from '@/sections/SiteMenu/SiteMenu'
import type { MenuData, SimpleMenuData, StickyMenuData } from '@/types/index'

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: LocaleSlug[]
  stickyMenuData?: StickyMenuData
}

const Header = async ({
  slugs = [],
  menuData,
  stickyMenuData,
}: HeaderProps) => {
  console.log('header slugs', slugs)
  const locale = await getLocale()
  const localization = {
    activeLocale: locale ?? defaultLanguage.iso,
  }
  const hasSearch = Flags.HAS_SEARCH
  const hasMoreThanOneLanguage = languages.length > 1
  const is404 = slugs?.length === 0
  const allSitesURL = getAllSitesLink('external')

  let columns = 1
  if (hasSearch) columns++
  if (hasMoreThanOneLanguage && !is404) columns++

  /** Display "All sites" in case menu is empty **/
  const shouldDisplayAllSites = !menuData

  /* Filter objects that have translations but no routes */
  const validSlugs = slugs?.filter(obj => obj?.slug)
  const t = await getTranslations()

  return (
    <TopbarWrapper stickyMenuData={stickyMenuData}>
      <LogoLink />
      <div
        className={`grid ${
          columns === 3
            ? 'grid-cols-[repeat(3,auto)]'
            : columns === 2
              ? 'grid-cols-[repeat(2,auto)]'
              : 'grid-cols-1'
        } items-center gap-x-4 sm:gap-x-6`}
      >
        {hasSearch && (
          <div>
            <ButtonLink
              variant='ghost'
              aria-expanded='false'
              aria-label={t('search')}
              href={
                localization.activeLocale === 'nb-NO' ? '/no/search' : '/search'
              }
              className='clickbound-area w-full p-2 md:px-5 md:py-3'
            >
              <Icon size={24} data={search} />
              <span className='max-md:sr-only'>{t('search')}</span>
            </ButtonLink>
          </div>
        )}
        {hasMoreThanOneLanguage && (
          <LocalizationSwitch
            activeLocale={localization.activeLocale}
            slugs={validSlugs}
          />
        )}
        {shouldDisplayAllSites ? (
          <NextLink
            className='cursor-pointer text-base no-underline hover:underline'
            href={allSitesURL}
            prefetch={false}
          >
            {t('all_sites')}
          </NextLink>
        ) : Flags.HAS_FANCY_MENU ? (
          <div>
            <SiteMenu data={menuData as MenuData} />
          </div>
        ) : (
          <div>
            {<SiteMenu variant='simple' data={menuData as SimpleMenuData} />}
          </div>
        )}
      </div>
    </TopbarWrapper>
  )
}

export default Header
