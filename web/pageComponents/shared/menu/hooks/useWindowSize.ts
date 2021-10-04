/* eslint-disable no-inner-declarations */

import { useState, useEffect } from 'react'

type WindowSize = {
  width: number | undefined
  height: number | undefined
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: undefined, height: undefined })

  useEffect(() => {
    // It is true that useEffect only run on client side, but Next.js will still throw
    // a warning during linting if the use of window is not guarded
    if (typeof window !== undefined) {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      // I guess we want to recalculate on window resize
      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return windowSize
}

export default useWindowSize
