'use client'
import { mergeRefs } from '@equinor/eds-utils'
import {
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { usePage } from '@/contexts/pageContext'
import StickyMenu from '@/sections/StickyMenu/StickyMenu'

export type TopbarWrapperProps = HTMLAttributes<HTMLDivElement>

export const TopbarWrapper = forwardRef<HTMLDivElement, TopbarWrapperProps>(
  function TopbarWrapper({ children }, ref) {
    const { headerData } = usePage()
    const { stickyMenuData } = headerData || {}
    const topbarRef = useRef<HTMLDivElement>(null)
    const combinedTopbarRef = useMemo(
      () => mergeRefs<HTMLDivElement>(topbarRef, ref),
      [ref],
    )
    const [height, setHeight] = useState(0)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [hasDropShadow, setHasDropShadow] = useState(false)
    const showSticky =
      stickyMenuData?.links && stickyMenuData?.links?.length > 0

    useEffect(() => {
      if (topbarRef?.current) {
        setHeight(topbarRef.current.getBoundingClientRect().height)
      }
    }, [])

    useEffect(() => {
      const handleScroll = () => {
        let currentScrollPos = window.scrollY
        // Fix for iOS to avoid negative scroll positions
        if (currentScrollPos < 0) currentScrollPos = 0

        setIsVisible(
          (prevScrollPos > currentScrollPos &&
            prevScrollPos - currentScrollPos > height) ||
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
    }, [prevScrollPos, height, hasDropShadow, stickyMenuData])

    useEffect(() => {
      if (topbarRef?.current) {
        const topbar = topbarRef.current

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
      <header>
        <nav
          ref={combinedTopbarRef}
          aria-label={'Global ' /*intl('global') TODO*/}
          className={`h-topbar w-full overflow-hidden ${showSticky ? 'sticky' : 'fixed'} z-40 animate-height bg-white-100 duration-300 ease-in-out [transition-property:top] ${isVisible ? 'top-0' : '-top-topbar'} ${hasDropShadow && !showSticky ? 'shadow-md' : ''} `}
        >
          <div className='mx-auto flex items-center justify-between px-layout-sm py-4'>
            {children}
          </div>
        </nav>
        {showSticky && (
          <StickyMenu
            {...stickyMenuData}
            className={`${isVisible ? 'top-topbar pt-2' : 'top-0'}`}
          />
        )}
      </header>
    )
  },
)
