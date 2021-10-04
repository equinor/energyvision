/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Topbar, MenuButton, Logo } from '@components'
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

const TempContainer = styled.div`
  display: flex;
  @media (min-width: 1300px) {
    flex-direction: row-reverse;
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
  const [isOpen, setIsOpen] = useState(false)

  const handleRouteChange = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, handleRouteChange])

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

  return (
    <HeaderRelative>
      <TopbarOffset topbarHeight={topbarHeight} />
      <Topbar height={topbarHeight} ref={topbarRef}>
        {/* @TODO: Localize strings */}
        <div>
          <NextLink href="/" passHref>
            <a aria-label="Equinor home page">
              <Logo />
            </a>
          </NextLink>
        </div>
        <TempContainer>
          {slugs && <LocalizationSwitch activeLocale={localization.activeLocale} {...slugs} />}

          <MenuButton title="Menu" ariaExpanded={isOpen} onClick={onMenuButtonClick} />
          <Menu height={topbarHeight} isOpen={isOpen} data={data} />
        </TempContainer>
      </Topbar>
    </HeaderRelative>
  )
}

export default Header
