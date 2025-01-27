import { forwardRef, HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react'
import { mergeRefs } from '@equinor/eds-utils'
import { StickyMenuData } from '../../types/index'
import StickyMenu from '@sections/StickyMenu/StickyMenu'
import { useIntl } from 'react-intl'

export type TopbarProps = {
  stickyMenuData?: StickyMenuData
} & HTMLAttributes<HTMLDivElement>

export const Topbar = forwardRef<HTMLDivElement, TopbarProps>(function Topbar(
  { stickyMenuData, children, ...rest },
  ref,
) {
  const topbarRef = useRef<HTMLDivElement>(null)
  const combinedTopbarRef = useMemo(() => mergeRefs<HTMLDivElement>(topbarRef, ref), [topbarRef, ref])
  const intl = useIntl()
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

  return (
    <>
      <nav
        ref={combinedTopbarRef}
        aria-label={intl.formatMessage({
          id: 'global',
          defaultMessage: 'Global',
        })}
        role="navigation"
        className={`
          w-screen 
          ${stickyMenuData ? 'sticky' : 'fixed'} 
          bg-white-100
          z-40
          animate-height
          [transition-property:top]
          ease-in-out  
          duration-300
          ${isVisible ? 'top-0' : '-top-[var(--topbar-height)]'} 
          ${hasDropShadow ? 'shadow-top-bar' : ''}`}
        {...rest}
      >
        <div className="px-layout-sm max-w-viewport mx-auto flex items-center justify-between py-4">{children}</div>
      </nav>
      {stickyMenuData && (
        <StickyMenu
          stickyMenuData={stickyMenuData}
          className={`${isVisible ? 'top-[calc(var(--topbar-height)-1px)] pt-2' : 'top-0'}`}
        />
      )}
    </>
  )
})
export default Topbar
