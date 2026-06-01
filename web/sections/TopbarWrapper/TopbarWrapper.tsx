'use client'
import { useTranslations } from 'next-intl'
import { type HTMLAttributes, useEffect, useRef, useState } from 'react'

export type TopbarWrapperProps = HTMLAttributes<HTMLDivElement>
export type TopbarWrapperStickyProps = TopbarWrapperProps & {
  hasSticky?: boolean
}

//same as global --spacing-topbar, but defined here to avoid importing css variables in js
const TOPBAR_HEIGHT = 85
export const TopbarWrapper = ({
  children,
  hasSticky,
}: TopbarWrapperStickyProps) => {
  const t = useTranslations()
  const topbarRef = useRef<HTMLElement>(null)
  const prevScrollPosRef = useRef(0)
  const isVisibleRef = useRef(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollPos = window.scrollY
      // Fix for iOS to avoid negative scroll positions
      if (currentScrollPos < 0) currentScrollPos = 0

      const previousScrollPos = prevScrollPosRef.current
      const nextIsVisible =
        (previousScrollPos > currentScrollPos &&
          previousScrollPos - currentScrollPos > TOPBAR_HEIGHT) ||
        currentScrollPos < previousScrollPos ||
        (currentScrollPos === 0 && previousScrollPos === 0)

      if (isVisibleRef.current !== nextIsVisible) {
        isVisibleRef.current = nextIsVisible
        setIsVisible(nextIsVisible)
      }

      prevScrollPosRef.current = currentScrollPos
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (topbarRef?.current) {
      const topbar = topbarRef.current

      const handleFocus = (event: FocusEvent) => {
        if (!isVisible) {
          isVisibleRef.current = true
          topbar.contains(event.target as Node) && setIsVisible(true)
        }
      }

      topbar.addEventListener('focusin', handleFocus)

      return () => topbar.removeEventListener('focusin', handleFocus)
    }
  }, [isVisible])

  return (
    <header
      data-topbar-visible={isVisible}
      className={`peer z-50 w-full bg-white-100 duration-400 ease-in-out [transition-property:top] ${hasSticky ? 'sticky' : 'fixed'} ${isVisible ? 'top-0' : '-top-topbar'}`}
    >
      <div className='mx-auto w-full max-w-fullwidth'>
        <nav
          aria-label={t('global') ?? 'Global'}
          className={`mx-auto h-topbar w-full max-w-content px-layout-sm`}
          ref={topbarRef}
        >
          <div className='flex items-center justify-between py-4'>
            {children}
          </div>
        </nav>
      </div>
    </header>
  )
}
