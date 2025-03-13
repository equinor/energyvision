/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { BackgroundContainer } from '@components'
import { AllSlugsType, LocalizationSwitch } from '../../pageComponents/shared/LocalizationSwitch'
import type { MenuData, SimpleMenuData, StickyMenuData } from '../../types/index'
import { Flags } from '../../common/helpers/datasetHelpers'
import { languages, defaultLanguage } from '../../languages'
import { FormattedMessage, useIntl } from 'react-intl'
import { search } from '@equinor/eds-icons'
import { getLocaleFromName, getNameFromLocale } from '../../lib/localization'
import Head from 'next/head'
import getConfig from 'next/config'
import { getAllSitesLink } from '../../common/helpers/getAllSitesLink'
import { Icon } from '@equinor/eds-core-react'
import { ButtonLink, LogoLink } from '@core/Link'
import SiteMenu from '@sections/SiteMenu/SiteMenu'
import Topbar from '@core/Topbar/Topbar'

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: AllSlugsType
  stickyMenuData?: StickyMenuData
}

const HeadTags = ({ slugs }: { slugs: AllSlugsType }) => {
  const router = useRouter()
  const localization = {
    activeLocale: router.locale || defaultLanguage.locale,
  }
  const { publicRuntimeConfig } = getConfig()

  const activeSlug =
    slugs.find((slug) => slug.lang === getNameFromLocale(localization.activeLocale))?.slug || router.asPath
  const defaultSlug = slugs.find((slug) => slug.lang === defaultLanguage.name)?.slug
  const defaultLocale = defaultLanguage.locale
  const canonicalSlug =
    localization.activeLocale === defaultLocale
      ? `${activeSlug !== '/' ? activeSlug : ''}`
      : `/${localization.activeLocale}${activeSlug !== '/' ? activeSlug : ''}`
  return (
    /** @TODO Add alternate tags to archived news */
    <Head>
      {slugs.length > 1 &&
        slugs.map((slug) => {
          const locale = getLocaleFromName(slug.lang)
          const correctedSlug = (defaultLocale !== locale ? `/${locale}` : '').concat(
            slug.slug !== '/' ? slug.slug : '',
          )
          return (
            <link
              key={locale}
              rel="alternate"
              hrefLang={locale}
              href={`${publicRuntimeConfig.domain}${correctedSlug}`}
            />
          )
        })}

      {slugs.length > 1 && (
        <link
          key="x-default"
          rel="alternate"
          hrefLang="x-default"
          href={`${publicRuntimeConfig.domain}${defaultSlug === '/' ? '' : defaultSlug}`}
        />
      )}

      <link rel="canonical" href={`${publicRuntimeConfig.domain}${canonicalSlug}`} />
    </Head>
  )
}

const AllSites = () => {
  const allSitesURL = getAllSitesLink('external')
  return (
    <NextLink className="cursor-pointer text-base no-underline hover:underline" href={allSitesURL} prefetch={false}>
      <FormattedMessage id="all_sites" defaultMessage="All Sites" />
    </NextLink>
  )
}

const Header = ({ slugs, menuData, stickyMenuData }: HeaderProps) => {
  const router = useRouter()
  const localization = {
    activeLocale: router.locale || defaultLanguage.locale,
  }
  const hasSearch = Flags.HAS_SEARCH
  const hasMoreThanOneLanguage = languages.length > 1
  const is404 = slugs.length === 0

  let columns = 1
  if (hasSearch) columns++
  if (hasMoreThanOneLanguage && !is404) columns++

  /** Display "All sites" in case menu is empty **/
  const shouldDisplayAllSites = !Flags.HAS_FANCY_MENU && !menuData

  /* Filter objects that have translations but no routes */
  const validSlugs = slugs.filter((obj) => obj.slug)
  const intl = useIntl()
  const searchLabel = intl.formatMessage({ id: 'search', defaultMessage: 'Search' })

  return (
    <>
      <HeadTags slugs={slugs} />
      <Topbar stickyMenuData={stickyMenuData}>
        <LogoLink />
        <div
          className={`grid ${
            columns == 3 ? 'grid-cols-auto-3' : columns == 2 ? 'grid-cols-auto-2' : 'grid-cols-1'
          } gap-x-4 items-center sm:gap-x-61`}
        >
          {hasSearch && (
            <div>
              <ButtonLink
                variant="ghost"
                aria-expanded="false"
                aria-label={searchLabel}
                href="/search"
                className="w-full p-2 md:px-5 md:py-3 clickbound-area"
              >
                <Icon size={24} data={search} />
                <span className="max-md:sr-only">
                  <FormattedMessage id="search" />
                </span>
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
              <SiteMenu variant="simple" data={menuData as SimpleMenuData} />
            </div>
          )}
        </div>
      </Topbar>
    </>
  )
}

export default Header
