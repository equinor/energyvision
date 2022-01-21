/* eslint-disable jsx-a11y/anchor-is-valid */
import styled, { createGlobalStyle } from 'styled-components'
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
  justify-self: right;
  align-items: center;
  display: flex;
  gap: var(--space-small);

  @media (min-width: 600px) {
    gap: var(--space-medium);
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
          <ControlsContainer>
            {/* @TODO: search page */}
            <NextLink href="/" passHref>
              <StyledButton variant="ghost_icon" href="" aria-label="Search">
                <Icon size={32} data={search} />
              </StyledButton>
            </NextLink>

            {slugs?.length > 0 && <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={slugs} />}
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
