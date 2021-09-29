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
          <a aria-label="Equinor home page">
            <Logo />
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
