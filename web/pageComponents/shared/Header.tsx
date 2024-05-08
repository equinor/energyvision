/* eslint-disable jsx-a11y/anchor-is-valid */
import styled, { createGlobalStyle } from 'styled-components'
import { CSSProperties } from 'react'
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { Topbar, BackgroundContainer } from '@components'
import { AllSlugsType, LocalizationSwitch } from './LocalizationSwitch'
import type { MenuData, SimpleMenuData } from '../../types/types'
import SiteMenu from './siteMenu/SiteMenu'
import SimpleSiteMenu from './siteMenu/simple/SimpleSiteMenu'
import { Flags } from '../../common/helpers/datasetHelpers'
import { LogoLink } from './LogoLink'
import { languages, defaultLanguage } from '../../languages'
import { FormattedMessage, useIntl } from 'react-intl'
import { search } from '@equinor/eds-icons'
import { getLocaleFromName, getNameFromLocale } from '../../lib/localization'
import Head from 'next/head'
import getConfig from 'next/config'
import { getAllSitesLink } from '../../common/helpers/getAllSitesLink'
import { Icon } from '@equinor/eds-core-react'
import { ButtonLink } from '@core/Link'

const TopbarOffset = createGlobalStyle`
  body {
    padding-top: var(--topbar-height);
  }
`

const HeaderRelative = styled.header`
  position: relative;
`

const TopbarContainer = styled(Topbar.InnerContainer)`
  display: grid;
  grid-template-areas: 'logo menu';
  grid-template-rows: 1fr;
  align-items: center;
  grid-column-gap: var(--space-large);
  column-gap: var(--space-large);
`
const LogoLinkInGrid = styled(LogoLink)`
  grid-area: logo;
`

/* This div is needed because of the grid layout to wrap focus lock panes.
  We might look into to improve this at some point. */
const ControlChild = styled.div``

const ControlsContainer = styled.div`
  grid-area: menu;
  justify-self: right;
  display: grid;
  grid-template-columns: repeat(var(--columns), auto);
  grid-column-gap: var(--space-small);
  column-gap: var(--space-small);
  align-items: center;

  @media (min-width: 600px) {
    grid-column-gap: var(--space-medium);
    column-gap: var(--space-medium);
  }
`

const StyledAllSites = styled(NextLink)`
  cursor: pointer;
  font-size: var(--typeScale-1);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: AllSlugsType
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
    <StyledAllSites href={allSitesURL} prefetch={false}>
      <FormattedMessage id="all_sites" defaultMessage="All Sites" />
    </StyledAllSites>
  )
}

const Header = ({ slugs, menuData }: HeaderProps) => {
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
    <HeaderRelative>
      <HeadTags slugs={slugs} />
      <TopbarOffset />
      <BackgroundContainer>
        <Topbar>
          <TopbarContainer>
            <LogoLinkInGrid />
            <ControlsContainer
              style={
                {
                  '--columns': columns,
                } as CSSProperties
              }
            >
              {hasSearch && (
                <ControlChild>
                  <ButtonLink variant="ghost" aria-expanded="true" aria-label="Search" href="/search" className="p-2">
                    <Icon size={24} data={search} />
                    <FormattedMessage id="search" />
                  </ButtonLink>
                </ControlChild>
              )}
              {hasMoreThanOneLanguage && (
                <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={validSlugs} />
              )}
              {shouldDisplayAllSites ? (
                <AllSites />
              ) : menuData && Flags.HAS_FANCY_MENU ? (
                <ControlChild>
                  <SiteMenu data={menuData as MenuData} />
                </ControlChild>
              ) : (
                <ControlChild>
                  <SimpleSiteMenu data={menuData as SimpleMenuData} />
                </ControlChild>
              )}
            </ControlsContainer>
          </TopbarContainer>
        </Topbar>
      </BackgroundContainer>
    </HeaderRelative>
  )
}

export default Header
