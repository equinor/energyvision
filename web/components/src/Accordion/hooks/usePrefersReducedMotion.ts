import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

const isRenderingOnServer = typeof window === 'undefined'

const getInitialState = () => {
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches
}

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    setPrefersReducedMotion(!mediaQueryList.matches)
  }, [])
  return prefersReducedMotion
}
