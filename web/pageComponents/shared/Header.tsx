/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Link from 'next/link'
import { Topbar, MenuButton, Logo } from '@components'
import Menu from './menu/Menu'
import type { MenuData } from '../../types/types'

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  #__next {
    margin-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

const SrText = styled.span`
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: rect(1px, 1px, 1px, 1px); /*maybe deprecated but we need to support legacy browsers */
  clip-path: inset(50%); /*modern browsers, clip-path works inwards from each corner*/
  white-space: nowrap; /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
`

const TempHideSmall = styled.div`
  display: none;
  @media (min-width: 1440px) {
    display: block;
  }
`

const TempHideLarge = styled.div`
  display: block;
  @media (min-width: 1440px) {
    display: none;
  }
`

export type HeaderProps = {
  data?: MenuData
  slugs?: {
    en_GB: string
    nb_NO: string
  }
}

const Header = ({ slugs, data }: HeaderProps) => {
  const [topbarHeight, setTopbarHeight] = useState(0)
  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  return (
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        {/* @TODO: Localize strings */}
        <Link href="/" passHref>
          <a>
            <Logo />
            <SrText>Equinor home page</SrText>
          </a>
        </Link>
        <TempHideLarge>
          <MenuButton title="Menu" ariaExpanded={false} />
        </TempHideLarge>
        <TempHideSmall>
          <Menu slugs={slugs} data={data} />
        </TempHideSmall>
      </Topbar>
    </>
  )
}

export default Header
