'use client'
import { useEffect, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@equinor/eds-utils'

const getMatches = (query: string): boolean => {
  // Prevents SSR issues
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches
  }
  return false
}

/**
 * Returns true if the given media query matches.
 * Returns undefined until the first render occured to prevent hydration errors.
 * @param query A media query as string
 * @returns
 */
export function useMediaQuery(query: string): boolean | undefined {
  const [hasMatch, setHasMatches] = useState<boolean>(getMatches(query))
  const [initialLoad, setInitialLoad] = useState(true)

  useIsomorphicLayoutEffect(() => {
    if (initialLoad) {
      setInitialLoad(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChange() {
    setHasMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener('change', handleChange)
    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return initialLoad ? undefined : hasMatch
}
