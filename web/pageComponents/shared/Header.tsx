/* eslint-disable jsx-a11y/anchor-is-valid */
import styled, { createGlobalStyle, CSSProperties } from 'styled-components'
import { useRouter } from 'next/router'
import { Topbar } from '@components'
import { AllSlugsType, LocalizationSwitch } from './LocalizationSwitch'
import type { MenuData, SimpleMenuData } from '../../types/types'
import SiteMenu from './siteMenu/SiteMenu'
import SimpleSiteMenu from './siteMenu/simple/SimpleSiteMenu'

import { isGlobal } from '../../common/helpers/datasetHelpers'
import { LogoLink } from './LogoLink'
import SearchOverlay from '../search/SearchOverlay'
import { languages, defaultLanguage } from '../../languages'
import { FormattedMessage } from 'react-intl'
import Link from 'next/link'

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

const StyledAllSites = styled.div`
  cursor: pointer;
  font-size: var(--typeScale-1);
`

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: AllSlugsType
}

const Header = ({ slugs, menuData }: HeaderProps) => {
  const router = useRouter()

  const localization = {
    activeLocale: router.locale || defaultLanguage.locale,
  }

  const hasSearch = isGlobal
  const hasMoreThanOneLanguage = languages.length > 1
  const is404 = slugs.length === 0

  let columns = 1
  if (hasSearch) columns++
  if (hasMoreThanOneLanguage && !is404) columns++

  /** Display "All sites" in case menu is empty **/
  const shouldDisplayAllSites = !isGlobal && !menuData
  const AllSites = () => (
    <Link href="https://www.equinor.com/languages.html?language=en" passHref>
      <StyledAllSites>
        <FormattedMessage id="all_sites" defaultMessage="All Sites" />
      </StyledAllSites>
    </Link>
  )

  return (
    <HeaderRelative>
      <TopbarOffset />
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
                <SearchOverlay />
              </ControlChild>
            )}
            {hasMoreThanOneLanguage && <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={slugs} />}
            {shouldDisplayAllSites ? (
              <AllSites />
            ) : menuData && isGlobal ? (
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
    </HeaderRelative>
  )
}

export default Header
