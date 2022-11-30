import { useEffect, useRef } from 'react'

export function useCompare(value?: number) {
  const prevVal = usePreviousValue(value)
  return prevVal !== value
}

// Helper hook
function usePreviousValue(value?: number) {
  const ref = useRef<number>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
