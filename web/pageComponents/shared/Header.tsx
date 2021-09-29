/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback, CSSProperties } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { RemoveScroll } from 'react-remove-scroll'
import { Topbar, MenuButton, Logo, Menu, List, Link } from '@components'
import { LocalizationSwitch } from './LocalizationSwitch'

import type { MenuData, SubMenuData } from '../../types/types'
import { MenuGroup } from './menu/MenuGroup'

const TopbarOffset = createGlobalStyle<{ topbarHeight: number }>`
  #__next {
    margin-top: ${({ topbarHeight }) => topbarHeight && `${topbarHeight}px`}
  }
`

const TopbarDropdown = styled.div`
  position: fixed;
  width: 100%;
  height: calc(100vh - var(--offset));
  background: var(--ui-background-default);
  overflow: auto;

  display: var(--display);
  z-index: 200;
`

const HeaderRelative = styled.header`
  position: relative;
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
    <HeaderRelative>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        {/* @TODO: Localize strings */}
        <NextLink href="/" passHref>
          <a aria-label="Equinor home page">
            <Logo />
          </a>
        </NextLink>
        {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}

        <MenuButton title="Menu" ariaExpanded={isOpen} onClick={onMenuButtonClick} />
      </Topbar>
      <RemoveScroll enabled={isOpen}>
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
      </RemoveScroll>
    </HeaderRelative>
  )
}

export default Header
