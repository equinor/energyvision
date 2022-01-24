/* eslint-disable jsx-a11y/anchor-is-valid */
import styled, { createGlobalStyle, CSSProperties } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, Button } from '@components'
import { AllSlugsType, LocalizationSwitch } from './LocalizationSwitch'
import type { MenuData } from '../../types/types'
import SiteMenu from './siteMenu/SiteMenu'
import SimpleSiteMenu from './siteMenu/SimpleSiteMenu'
import { Icon } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { isGlobal } from '../../common/helpers/datasetHelpers'
import { LogoLink } from './LogoLink'

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

const StyledButton = styled(Button)`
  color: var(--default-text);
  fill: var(--default-text);
`

export type HeaderProps = {
  menuData?: MenuData
  simpleMenuData?: any
  slugs: AllSlugsType
}

const Header = ({ slugs, menuData, simpleMenuData }: HeaderProps) => {
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
            {/* @TODO: search page */}
            <NextLink href="/" passHref>
              <StyledButton variant="ghost_icon" href="" aria-label="Search">
                <Icon size={32} data={search} />
              </StyledButton>
            </NextLink>
            <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={slugs} />
            {isGlobal
              ? menuData && (
                  <div>
                    <SiteMenu data={menuData} />
                  </div>
                )
              : simpleMenuData && (
                  <div>
                    <SimpleSiteMenu data={simpleMenuData} />
                  </div>
                )}
          </ControlsContainer>
        </TopbarContainer>
      </Topbar>
    </HeaderRelative>
  )
}

export default Header
