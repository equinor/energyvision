/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, MenuButton, Logo } from '@components'
import { LocalizationSwitch } from './LocalizationSwitch'

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
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        {/* @TODO: Localize strings */}
        <Link href="/" passHref>
          <a aria-label="Equinor home page">
            <Logo />
          </a>
        </Link>
        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
        <TempHideLarge>
          <MenuButton title="Menu" ariaExpanded={false} />
        </TempHideLarge>
        <TempHideSmall>
          <Menu data={data} />
        </TempHideSmall>
      </Topbar>
    </>
  )
}

export default Header
