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
import SearchOverlay from '../search/hooksLib/SearchOverlay'

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
  grid-template-columns: repeat(var(--columns), min-content);
  grid-column-gap: var(--space-small);
  column-gap: var(--space-small);
  align-items: center;

  @media (min-width: 600px) {
    grid-column-gap: var(--space-medium);
    column-gap: var(--space-medium);
  }
`

export type HeaderProps = {
  menuData?: MenuData | SimpleMenuData
  slugs: AllSlugsType
}

const Header = ({ slugs, menuData }: HeaderProps) => {
  const router = useRouter()

  const localization = {
    activeLocale: router.locale || 'en',
  }

  return (
    <HeaderRelative>
      <TopbarOffset />

      <Topbar>
        <TopbarContainer>
          <LogoLinkInGrid />
          <ControlsContainer style={{ '--columns': slugs?.length > 1 ? 3 : 2 } as CSSProperties}>
            {isGlobal && (
              <ControlChild>
                <SearchOverlay />
              </ControlChild>
            )}
            {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={slugs} />}

            {menuData && isGlobal ? (
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
