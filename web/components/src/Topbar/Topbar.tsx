/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components'
import { useState, useEffect, useRef, HTMLAttributes } from 'react'

const Bar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--topbar-height);
  padding: 0 var(--layout-paddingHorizontal-small);
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
      let currentScrollPos = window.pageYOffset
      // Fix for iOS to avoid negative scroll positions
      if (currentScrollPos < 0) currentScrollPos = 0
      setIsVisible(
        (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > height) ||
          currentScrollPos < prevScrollPos ||
          (currentScrollPos === 0 && prevScrollPos === 0),
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
