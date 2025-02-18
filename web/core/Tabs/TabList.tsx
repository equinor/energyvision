import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import envisTwMerge from '../../twMerge'
import { mergeRefs } from '@equinor/eds-utils'

export type TabListProps = {
  /* Provides a label that describes the purpose of the set of tabs. */
  'aria-label'?: string
} & RadixTabs.TabsListProps

export const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { 'aria-label': ariaLabel, children, className = '', ...rest },
  ref,
) {
  const tabListRef = useRef<HTMLDivElement>(null)
  const combinedRef = useMemo(() => mergeRefs<HTMLDivElement>(tabListRef, ref), [tabListRef, ref])
  const [isOverflowing, setIsOverflowing] = useState<boolean>(true)

  useEffect(() => {
    const checkIsOverflowing = function (el: HTMLDivElement) {
      if (!el) return false
      const curOverflow = el.style.overflow
      if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden'

      const isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight

      el.style.overflow = curOverflow
      return isOverflowing
    }

    const container = tabListRef?.current
    if (container) {
      setIsOverflowing(checkIsOverflowing(container))
      window.addEventListener('resize', () => setIsOverflowing(checkIsOverflowing(container)))
      return () => {
        window.removeEventListener('resize', () => setIsOverflowing(checkIsOverflowing(container)))
      }
    }
  }, [tabListRef])

  return (
    <RadixTabs.List
      ref={combinedRef}
      className={envisTwMerge(
        `
        group/tablist
        w-full
        overflow-x-auto
        flex
        flex-nowrap
        gap-0
        ${isOverflowing ? '' : 'justify-center'}
        envis-scrollbar
        `,
        className,
      )}
      aria-label={ariaLabel}
      data-overflowing={isOverflowing}
      {...rest}
    >
      {children}
    </RadixTabs.List>
  )
})
