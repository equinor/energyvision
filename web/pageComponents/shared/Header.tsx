/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback, CSSProperties } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, MenuButton, Logo, Menu, List, Link } from '@components'
import { LocalizationSwitch } from './LocalizationSwitch'

import type { MenuData, SubMenuData } from '../../types/types'
import { MenuGroup } from './menu/MenuGroup'

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

const TopbarDropdown = styled.div`
  position: absolute;
  width: 100%;
  background: var(--ui-background-default);
  top: var(--offset);
  left: 0;
  display: var(--display);
  overflow: scroll;
`
const SubMenuContent = styled.div`
  display: flex;
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
  const [isOpen, setIsOpen] = useState(false)

  const topbarRef = useCallback((node) => {
    if (node !== null) {
      const height = node.getBoundingClientRect().height
      setTopbarHeight(height)
    }
  }, [])

  const localization = {
    activeLocale: router.locale || 'en',
  }

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = (data && data.subMenus) || []

  return (
    <>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        {/* @TODO: Localize strings */}
        <NextLink href="/" passHref>
          <a aria-label="Equinor home page">
            <Logo />
          </a>
        </NextLink>
        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}
        <TempHideLarge>
          <MenuButton title="Menu" ariaExpanded={isOpen} onClick={onMenuButtonClick} />
        </TempHideLarge>
        <TopbarDropdown
          style={
            {
              '--offset': `${topbarHeight}px`,
              '--display': isOpen ? 'block' : 'none',
            } as CSSProperties
          }
        >
          <nav>
            <Menu>
              {menuItems.map((topLevelItem: SubMenuData) => {
                if (topLevelItem?.topLevelLink.isDisabled) return null
                return <MenuGroup key={topLevelItem.id} {...topLevelItem} />
              })}
            </Menu>
          </nav>
        </TopbarDropdown>
      </Topbar>
    </>
  )
}

export default Header
