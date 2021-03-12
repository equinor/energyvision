/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import styled from 'styled-components'
import { useState, useEffect, forwardRef, HTMLAttributes } from 'react'

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  transition: top 0.3s;
  z-index: 10;
`

const Logo = styled.img`
  display: block;
  height: 45px;
  max-width: 100%;
  margin-right: 2rem;
  box-sizing: content-box;
`

export type TopbarProps = {
  height: number
} & HTMLAttributes<HTMLDivElement>

export const Topbar = forwardRef<HTMLDivElement, TopbarProps>(function Topbar({ children, height }, ref) {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset
    setIsVisible(
      (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > height) ||
        currentScrollPos < prevScrollPos,
    )
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, isVisible, handleScroll, height])

  return (
    <Bar ref={ref} style={{ top: isVisible ? 0 : -height }}>
      <Link href="/">
        <a>
          <Logo src="https://eds-static.equinor.com/logo/equinor-logo-horizontal.svg#red" alt="Equinor" />
        </a>
      </Link>

      {children}
    </Bar>
  )
})
