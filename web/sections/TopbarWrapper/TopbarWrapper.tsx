'use client'
import { useTranslations } from 'next-intl'
import { type HTMLAttributes, useEffect, useRef, useState } from 'react'
import { usePage } from '@/contexts/pageContext'
import StickyMenu from '@/sections/StickyMenu/StickyMenu'

export type TopbarWrapperProps = HTMLAttributes<HTMLDivElement>

export const TopbarWrapper = ({ children }: TopbarWrapperProps) => {
  const { headerData } = usePage()
  const { stickyMenuData } = headerData || {}
  const t = useTranslations()
  const topbarRef = useRef<HTMLElement>(null)
  const [height, setHeight] = useState(0)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [hasDropShadow, setHasDropShadow] = useState(false)
  const showSticky =
    (stickyMenuData?.links && stickyMenuData?.links?.length > 0) ?? false

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

      if (!showSticky) {
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
  }, [prevScrollPos, height, hasDropShadow, showSticky])

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

  const globalNav = (
    <nav
      aria-label={t('global') ?? 'Global'}
      className={`h-topbar w-full max-w-full animate-height overflow-hidden bg-white-100 px-layout-sm duration-500 ease-in-out [transition-property:margin-top] ${isVisible ? 'mt-0' : '-mt-topbar'} `}
      ref={topbarRef}
    >
      <div className='flex items-center justify-between py-4'>{children}</div>
    </nav>
  )
  //${isVisible ? 'top-topbar pt-2' : 'top-0'}
  return (
    <header
      className={`peer fixed right-0 left-0 z-40 mx-auto w-full max-w-fullwidth ${hasDropShadow || showSticky ? 'shadow-md' : ''}`}
      data-sticky={showSticky}
    >
      <div className='mx-auto w-full max-w-content'>
        {globalNav}
        {showSticky && stickyMenuData && (
          <StickyMenu {...stickyMenuData} className={`top-0`} />
        )}
      </div>
    </header>
  )
}
