/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useRef, HTMLAttributes } from 'react'
import { useIsomorphicLayoutEffect } from '@equinor/eds-utils'
import envisTwMerge from '../../../twMerge'

export const Topbar = ({ children, className = '', ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const ref = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [hasDropShadow, setHasDropShadow] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (ref && ref?.current) {
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [setHeight])

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      let currentScrollPos = window.pageYOffset
      // Fix for iOS to avoid negative scroll positions
      if (currentScrollPos < 0) currentScrollPos = 0
      setIsVisible(
        (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > height) ||
          currentScrollPos < prevScrollPos ||
          (currentScrollPos === 0 && prevScrollPos === 0),
      )

      // Why so complicated? To attempt to limit the amount of calls to setHasDropShadow
      if (currentScrollPos < 50) {
        if (hasDropShadow) {
          setHasDropShadow(false)
        }
      } else {
        if (prevScrollPos > currentScrollPos) {
          if (!hasDropShadow) {
            setHasDropShadow(true)
          }
        } else if (prevScrollPos < currentScrollPos && hasDropShadow) {
          setHasDropShadow(false)
        }
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos, isVisible, height, hasDropShadow])

  useIsomorphicLayoutEffect(() => {
    if (ref && ref?.current) {
      const topbar = ref.current

      const handleFocus = (event: FocusEvent) => {
        if (!isVisible) {
          topbar.contains(event.target as Node) && setIsVisible(true)
        }
      }

      topbar.addEventListener('focusin', handleFocus)

      return () => topbar.removeEventListener('focusin', handleFocus)
    }
  }, [isVisible])

  return (
    <div
      ref={ref}
      className={envisTwMerge(
        `flex 
        items-center
        w-full
        h-[var(--topbar-height)]
        px-layout-sm 
        fixed
        top-0
        transition-[top]
        duration-300
        z-10
        bg-white-100
        ${hasDropShadow ? 'shadow-[0_0_15px_10px_rgba(41,62,64,0.15)]' : ''}
        `,
        className,
      )}
      style={{ top: isVisible ? 0 : -height }}
      {...rest}
    >
      {children}
    </div>
  )
}
