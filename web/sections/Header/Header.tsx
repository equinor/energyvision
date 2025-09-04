'use client'
import { useLocale, useTranslations } from 'next-intl'
import { default as NextLink } from 'next/link'
import { AllSlugsType, LocalizationSwitch } from '../../pageComponents/shared/LocalizationSwitch'
import type { MenuData, SimpleMenuData, StickyMenuData } from '../../types/index'
import { Flags } from '../../common/helpers/datasetHelpers'
import { languages, defaultLanguage } from '../../languages'
import { search } from '@equinor/eds-icons'
import { getAllSitesLink } from '../../common/helpers/getAllSitesLink'
import { Icon } from '@equinor/eds-core-react'
import { ButtonLink, LogoLink } from '@/core/Link'
import SiteMenu from '@/sections/SiteMenu/SiteMenu'
import Topbar from '@/core/Topbar/Topbar'

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: AllSlugsType
  stickyMenuData?: StickyMenuData
}

/* const HeadTags = ({ slugs }: { slugs: AllSlugsType }) => {
  //const router = useRouter()
  console.log('slugs', slugs)
  const locale = useLocale()
  const pathname = usePathname()

  const localization = {
    activeLocale: locale || defaultLanguage.locale,
  }
  //const { publicRuntimeConfig } = getConfig()

  const activeSlug = slugs.find((slug) => slug.lang === getNameFromLocale(localization.activeLocale))?.slug || pathname
  const defaultSlug = slugs.find((slug) => slug.lang === defaultLanguage.name)?.slug
  const defaultLocale = defaultLanguage.locale
  const canonicalSlug =
    localization.activeLocale === defaultLocale
      ? `${activeSlug !== '/' ? activeSlug : ''}`
      : `/${localization.activeLocale}${activeSlug !== '/' ? activeSlug : ''}`

  console.log('defaultSlug', defaultSlug)
  console.log('canonicalSlug', canonicalSlug)
  return (
    <Head>
      {slugs.length > 1 &&
        slugs.map((slug) => {
          const locale = getLocaleFromName(slug.lang)
          const correctedSlug = (defaultLocale !== locale ? `/${locale}` : '').concat(
            slug.slug !== '/' ? slug.slug : '',
          )
          console.log('correctedSlug', correctedSlug)
          return <link key={locale} rel="alternate" hrefLang={locale} href={`${correctedSlug}`} />
        })}

      {slugs.length > 1 && (
        <link key="x-default" rel="alternate" hrefLang="x-default" href={`${defaultSlug === '/' ? '' : defaultSlug}`} />
      )}

      <link rel="canonical" href={`${canonicalSlug}`} />
    </Head>
  )
} */

const AllSites = () => {
  const allSitesURL = getAllSitesLink('external')
  const t = useTranslations()
  return (
    <NextLink className="cursor-pointer text-base no-underline hover:underline" href={allSitesURL} prefetch={false}>
      {t('all_sites')}
    </NextLink>
  )
}

const Header = ({ slugs, menuData, stickyMenuData }: HeaderProps) => {
  const locale = useLocale()
  const localization = {
    activeLocale: locale || defaultLanguage.locale,
  }
  const hasSearch = Flags.HAS_SEARCH
  const hasMoreThanOneLanguage = languages.length > 1
  const is404 = slugs?.length === 0

  let columns = 1
  if (hasSearch) columns++
  if (hasMoreThanOneLanguage && !is404) columns++

  /** Display "All sites" in case menu is empty **/
  const shouldDisplayAllSites = !menuData

  /* Filter objects that have translations but no routes */
  const validSlugs = slugs?.filter((obj) => obj.slug)
  const t = useTranslations()
  const searchLabel = t('search')

  return (
    <>
      <Topbar stickyMenuData={stickyMenuData}>
        <LogoLink />
        <div
          className={`grid ${
            columns == 3 ? 'grid-cols-[repeat(3,auto)]' : columns == 2 ? 'grid-cols-[repeat(2,auto)]' : 'grid-cols-1'
          } items-center gap-x-4 sm:gap-x-6`}
        >
          {hasSearch && (
            <div>
              <ButtonLink
                variant="ghost"
                aria-expanded="false"
                aria-label={searchLabel}
                href="/search"
                className="clickbound-area w-full p-2 md:px-5 md:py-3"
              >
                <Icon size={24} data={search} />
                <span className="max-md:sr-only">{t('search')}</span>
              </ButtonLink>
            </div>
          )}
          {hasMoreThanOneLanguage && (
            <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={validSlugs} />
          )}
          {shouldDisplayAllSites ? (
            <AllSites />
          ) : Flags.HAS_FANCY_MENU ? (
            <div>
              <SiteMenu data={menuData as MenuData} />
            </div>
          ) : (
            <div>{<SiteMenu variant="simple" data={menuData as SimpleMenuData} />}</div>
          )}
        </div>
      </Topbar>
    </>
  )
}

export default Header
