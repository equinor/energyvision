/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import styled from 'styled-components'
import { useState, useEffect, useCallback } from 'react'

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1em 2em;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  transition: top 0.3s;
`

const Logo = styled.img`
  display: block;
  height: 45px;
  max-width: 100%;
  margin-right: 2em;
  box-sizing: content-box;
`
export const Topbar: React.FC = ({ children }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [barHeight, setBarHeight] = useState(0)

  const topbarRef = useCallback((node) => {
    if (node !== null) {
      setBarHeight(node.getBoundingClientRect().height)
    }
  }, [])

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    setIsVisible(
      (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > barHeight) ||
        currentScrollPos < prevScrollPos,
    )
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, isVisible, handleScroll, barHeight])

  return (
    <Bar ref={topbarRef} style={{ top: isVisible ? 0 : -barHeight }}>
      <Link href="/">
        <a>
          <Logo src="https://eds-static.equinor.com/logo/equinor-logo-horizontal.svg#red" alt="Equinor" />
        </a>
      </Link>

      {children}
    </Bar>
  )
}
