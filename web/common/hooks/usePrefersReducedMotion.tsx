import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    setPrefersReducedMotion(!window.matchMedia(QUERY).matches)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }

    mediaQueryList.addEventListener('change', listener)

    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [])

  return prefersReducedMotion
}
