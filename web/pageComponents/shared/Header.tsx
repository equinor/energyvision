/* eslint-disable jsx-a11y/anchor-is-valid */
import styled, { createGlobalStyle } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, Button, LogoSecondary } from '@components'
import { AllSlugsType, LocalizationSwitch } from './LocalizationSwitch'
import type { MenuData } from '../../types/types'
import SiteMenu from './siteMenu/SiteMenu'
import { Icon } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'
import { outlineTemplate, Tokens } from '@utils'
import { isGlobal } from '../../common/helpers/datasetHelpers'

const { outline } = Tokens

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

const StyledLogoLink = styled.a`
  grid-area: logo;
  justify-self: left;
  display: flex;
  height: 100%;
  align-items: center;

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  > svg {
    margin-top: -12%;
  }
`

const ControlsContainer = styled.div`
  grid-area: menu;
  justify-self: right;
  display: grid;
  grid-template-columns: repeat(3, min-content);
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
  data?: MenuData
  slugs: AllSlugsType
}

const Header = ({ slugs, data }: HeaderProps) => {
  const router = useRouter()

  const localization = {
    activeLocale: router.locale || 'en',
  }

  return (
    <HeaderRelative>
      <TopbarOffset />

      <Topbar>
        {/* @TODO: Localize strings */}
        <TopbarContainer>
          <NextLink href="/" passHref>
            <StyledLogoLink aria-label="Equinor home page">
              <LogoSecondary />
            </StyledLogoLink>
          </NextLink>

          <ControlsContainer>
            {/* @TODO: search page */}
            <NextLink href="/" passHref>
              <StyledButton variant="ghost_icon" href="" aria-label="Search">
                <Icon size={32} data={search} />
              </StyledButton>
            </NextLink>

            {slugs?.length > 0 && <LocalizationSwitch activeLocale={localization.activeLocale} allSlugs={slugs} />}

            {isGlobal && data && <SiteMenu data={data} />}
          </ControlsContainer>
        </TopbarContainer>
      </Topbar>
    </HeaderRelative>
  )
}

export default Header
