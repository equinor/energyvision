/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, Logo, Button } from '@components'
import { LocalizationSwitch } from './LocalizationSwitch'
import type { MenuData } from '../../types/types'
import Menu from './menu/Menu'
import { Icon } from '@equinor/eds-core-react'
import { search } from '@equinor/eds-icons'

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  body {
    padding-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

const HeaderRelative = styled.header`
  position: relative;
`

const TopbarContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'menu logo controls';
  grid-template-rows: min-content 1fr min-content;
  align-items: center;
`

const StyledMenu = styled(Menu)`
  grid-area: menu;
  justify-self: left;
`

const StyledLogoLink = styled.a`
  grid-area: logo;
  justify-self: center;
`

const ControlsContainer = styled.div`
  grid-area: controls;
  justify-self: right;
  display: flex;
  align-items: center;
`

const StyledButton = styled(Button)`
  color: var(--default-text);
  fill: var(--default-text);
`

export type HeaderProps = {
  data?: MenuData
  slugs?: {
    en_GB: string
    nb_NO: string
  }
}

const Header = ({ slugs, data }: HeaderProps) => {
  const router = useRouter()
  const [topbarHeight, setTopbarHeight] = useState(0)

  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  const localization = {
    activeLocale: router.locale || 'en',
  }

  return (
    <HeaderRelative>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        {/* @TODO: Localize strings */}
        <TopbarContainer>
          <StyledMenu data={data} />

          <NextLink href="/" passHref>
            <StyledLogoLink aria-label="Equinor home page">
              <Logo />
            </StyledLogoLink>
          </NextLink>

          <ControlsContainer>
            {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}

            {/* @TODO: search page */}
            <NextLink href="/" passHref>
              <StyledButton variant="ghost_icon" href="">
                <Icon data={search} />
              </StyledButton>
            </NextLink>
          </ControlsContainer>
        </TopbarContainer>
      </Topbar>
    </HeaderRelative>
  )
}

export default Header
