/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components'
import { useState, useEffect, useRef, HTMLAttributes } from 'react'

// @TODO: Not finished
// 64px height from the mobile sketches in figma
const Bar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--topbar-height);
  padding: var(--space-small) var(--space-medium);
  position: fixed;
  top: 0;
  transition: top 0.3s;
  z-index: 10;
  background-color: var(--white-100);
`

export const Topbar = ({ children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (ref && ref?.current) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [setHeight])

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
    <Bar ref={ref} style={{ top: isVisible ? 0 : -height }} {...rest}>
      {children}
    </Bar>
  )
}
