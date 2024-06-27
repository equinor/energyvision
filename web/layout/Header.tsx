'use client'
import { usePathname } from 'next/navigation'
import { Topbar } from '@components'
import type { MenuData, SimpleMenuData } from '../types/types'
import { Flags } from '../common/helpers/datasetHelpers'
import { languages, defaultLanguage, domain } from '../languages'
import { FormattedMessage, useIntl } from 'react-intl'
import { search } from '@equinor/eds-icons'
import { getLocaleFromName, getNameFromLocale } from '../lib/localization'
import Head from 'next/head'
import { getAllSitesLink } from '../common/helpers/getAllSitesLink'
import { Icon } from '@equinor/eds-core-react'
import { BaseLink, ButtonLink } from '@core/Link'
import { LogoLink } from '../pageComponents/shared/LogoLink'
import SimpleSiteMenu from '../pageComponents/shared/siteMenu/simple/SimpleSiteMenu'
import { AllSlugsType, LocalizationSwitch } from '../pageComponents/shared/LocalizationSwitch'
import SiteMenu from '../pageComponents/shared/siteMenu/SiteMenu'

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: AllSlugsType
}

const HeadTags = ({ slugs }: { slugs: AllSlugsType }) => {
  const intl = useIntl()
  const pathname = usePathname()
  const localization = {
    activeLocale: intl.locale || defaultLanguage.locale,
  }

  const activeSlug =
    slugs.find((slug: any) => slug.lang === getNameFromLocale(localization.activeLocale))?.slug || pathname
  const defaultSlug = slugs.find((slug: any) => slug.lang === defaultLanguage.name)?.slug
  const defaultLocale = defaultLanguage.locale
  const canonicalSlug =
    localization.activeLocale === defaultLocale
      ? `${activeSlug !== '/' ? activeSlug : ''}`
      : `/${localization.activeLocale}${activeSlug !== '/' ? activeSlug : ''}`
  return (
    /** @TODO Add alternate tags to archived news */
    <Head>
      {slugs.length > 1 &&
        slugs.map((slug: any) => {
          const locale = getLocaleFromName(slug.lang)
          const correctedSlug = (defaultLocale !== locale ? `/${locale}` : '').concat(
            slug.slug !== '/' ? slug.slug : '',
          )
          return <link key={locale} rel="alternate" hrefLang={locale} href={`${domain}${correctedSlug}`} />
        })}

      {slugs.length > 1 && (
        <link
          key="x-default"
          rel="alternate"
          hrefLang="x-default"
          href={`${domain}${defaultSlug === '/' ? '' : defaultSlug}`}
        />
      )}

      <link rel="canonical" href={`${domain}${canonicalSlug}`} />
    </Head>
  )
}

const AllSites = () => {
  const allSitesURL = getAllSitesLink('external')
  return (
    <BaseLink href={allSitesURL} className="cursor-pointer no-underline hover:underline">
      <FormattedMessage id="all_sites" defaultMessage="All Sites" />
    </BaseLink>
  )
}

const Header = ({ slugs, menuData }: HeaderProps) => {
  const intl = useIntl()
  const localization = {
    activeLocale: intl.locale || defaultLanguage.locale,
  }
  const hasSearch = Flags.HAS_SEARCH
  const hasMoreThanOneLanguage = languages.length > 1
  const is404 = slugs.length === 0

  let columns = 1
  if (hasSearch) columns++
  if (hasMoreThanOneLanguage && !is404) columns++
  const columnStyle: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
  }

  /** Display "All sites" in case menu is empty **/
  const shouldDisplayAllSites = !Flags.HAS_FANCY_MENU && !menuData

  /* Filter objects that have translations but no routes */
  const validSlugs = slugs.filter((obj: any) => obj.slug)
  const searchLabel = intl.formatMessage({ id: 'search', defaultMessage: 'Search' })

  return (
    <header className="relative">
      <HeadTags slugs={slugs} />
      <Topbar>
        <Topbar.InnerContainer
          className={`flex 
            justify-between
            items-center
            gap-x-8
            `}
        >
          <LogoLink className="mr-auto" />
          <div
            className={`
                grid
                ${columnStyle[columns]}
                gap-4
                items-center
                md:gap-6
                `}
          >
            {hasSearch && (
              <div>
                <ButtonLink
                  variant="ghost"
                  aria-expanded="true"
                  aria-label={searchLabel}
                  href="/search"
                  className="p-2 md:px-5 md:py-3"
                >
                  <Icon size={24} data={search} />
                  <FormattedMessage id="search" />
                </ButtonLink>
              </div>
            )}
            {hasMoreThanOneLanguage && (
              <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={validSlugs} />
            )}
            {shouldDisplayAllSites ? (
              <AllSites />
            ) : menuData && Flags.HAS_FANCY_MENU ? (
              <div>
                <SiteMenu data={menuData as MenuData} />
              </div>
            ) : (
              <div>
                <SimpleSiteMenu data={menuData as SimpleMenuData} />
              </div>
            )}
          </div>
        </Topbar.InnerContainer>
      </Topbar>
    </header>
  )
}

export default Header
