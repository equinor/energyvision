/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components'
import { useState, useEffect, forwardRef, HTMLAttributes } from 'react'

// @TODO: Not finished
// 64px height from the mobile sketches in figma
const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: var(--space-small) var(--space-medium);
  background: transparent;
  position: fixed;
  top: 0;
  transition: top 0.3s;
  z-index: 10;
  background-color: var(--white-100);
  @media (min-width: 800px) {
    padding: 1rem 2rem;
  }
`

export type TopbarProps = {
  height: number
} & HTMLAttributes<HTMLDivElement>

export const Topbar = forwardRef<HTMLDivElement, TopbarProps>(function Topbar({ children, height }, ref) {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      setIsVisible(
        (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > height) ||
          currentScrollPos < prevScrollPos,
      )
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, isVisible, height])

  return (
    <Bar ref={ref} style={{ top: isVisible ? 0 : -height }}>
      {children}
    </Bar>
  )
})
