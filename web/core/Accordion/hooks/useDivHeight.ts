import { useRef, useEffect, useState } from 'react'

export function useDivHeight() {
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        if (!entry) {
          return
        }
        setHeight(entry.target.getBoundingClientRect().height)
      })
    })

    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Do you have any suggestions here Sven
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return { ref, height }
}
