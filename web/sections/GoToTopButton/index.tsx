'use client'

import { useEffect, useState } from 'react'
import ArrowUp from '@/icons/ArrowUp'

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (typeof window !== 'undefined') {
      setIsVisible(window.scrollY > window.innerHeight)
    }
  }

  // Scroll to top smoothly
  const scrollToTop = () => {
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
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Go to top"
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-slate-blue-95 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  )
}
