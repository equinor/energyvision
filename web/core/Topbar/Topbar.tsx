import { forwardRef, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { mergeRefs } from '@equinor/eds-utils'
import { StickyMenuData } from '../../types/index'
import StickyMenu from '@sections/StickyMenu/StickyMenu'

export type TopbarProps = {
  stickyMenuData?: StickyMenuData
} & HTMLAttributes<HTMLDivElement>

export const Topbar = forwardRef<HTMLDivElement, TopbarProps>(function Topbar(
  { stickyMenuData, children, ...rest },
  ref,
) {
  const topbarRef = useRef<HTMLDivElement>(null)
  const combinedTopbarRef = useMemo(() => mergeRefs<HTMLDivElement>(topbarRef, ref), [topbarRef, ref])

  const [height, setHeight] = useState(0)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [hasDropShadow, setHasDropShadow] = useState(false)

  useEffect(() => {
    if (topbarRef && topbarRef?.current) {
      setHeight(topbarRef.current.getBoundingClientRect().height)
    }
  }, [setHeight, topbarRef])

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollPos = window.scrollY
      // Fix for iOS to avoid negative scroll positions
      if (currentScrollPos < 0) currentScrollPos = 0

      setIsVisible(
        (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > height) ||
          currentScrollPos < prevScrollPos ||
          (currentScrollPos === 0 && prevScrollPos === 0),
      )

      if (!stickyMenuData) {
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
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, isVisible, height, hasDropShadow, stickyMenuData])

  useEffect(() => {
    if (topbarRef && topbarRef?.current) {
      const topbar = topbarRef.current

      const handleFocus = (event: FocusEvent) => {
        if (!isVisible) {
          topbar.contains(event.target as Node) && setIsVisible(true)
        }
      }

      topbar.addEventListener('focusin', handleFocus)

      return () => topbar.removeEventListener('focusin', handleFocus)
    }
  }, [isVisible, topbarRef])

  const animateScrollUpClassName = `
  [will-change:transform]
  [transition-behavior:allow-discrete]
  animate-height
  ${isVisible ? 'top-0' : '-top-[var(--topbar-height)]'} 
  [transition-property:height]
  [transition-property:padding]
  ease-in-out 
  duration-400 
  `

  return (
    <>
      <div
        ref={combinedTopbarRef}
        className={`w-screen sticky bg-white-100 z-40 ${animateScrollUpClassName}
      ${hasDropShadow ? 'shadow-top-bar' : ''}`}
        {...rest}
      >
        <div className="px-layout-sm max-w-viewport mx-auto flex items-center justify-between py-4">{children}</div>
      </div>
      {stickyMenuData && (
        <StickyMenu stickyMenuData={stickyMenuData} className={`${isVisible ? 'top-[80px] pt-2' : 'top-0'}`} />
      )}
    </>
  )
})
export default Topbar
