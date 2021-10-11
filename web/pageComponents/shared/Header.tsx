/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, Logo } from '@components'
import { LocalizationSwitch } from './LocalizationSwitch'
import type { MenuData } from '../../types/types'
import Menu from './menu/Menu'

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  #__next {
    margin-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

const HeaderRelative = styled.header`
  position: relative;
`

const TopbarContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: 'menu logo langSwitch';
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

const StyledLocalizationSwitch = styled(LocalizationSwitch)`
  grid-area: langSwitch;
  justify-self: right;
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

          {slugs && <StyledLocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
        </TopbarContainer>
      </Topbar>
    </HeaderRelative>
  )
}

export default Header
