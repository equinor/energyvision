'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import ArrowUp from '@/icons/ArrowUp'

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations()

  // Show button when page is scrolled down
  const toggleVisibility = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > window.innerHeight)
    }
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    //Remove # anchors from url when scrolling up
    history.replaceState(null, document.title, window.location.pathname)
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [toggleVisibility])

  return (
    // biome-ignore lint/a11y/useSemanticElements: not use footer
    <div role='contentinfo' aria-label={`${t('goToTop')} container`}>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label={t('goToTop') ?? 'Go to top'}
          className='fixed right-8 bottom-8 z-40 cursor-pointer rounded-full bg-slate-blue-95 p-3 text-white shadow-lg transition-all duration-300 hover:shadow-xl'
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
}
