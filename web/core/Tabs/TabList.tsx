'use client'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import { mergeRefs } from '@equinor/eds-utils'
import { twMerge } from 'tailwind-merge'

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

  const [averageTabWidth, setAverageTabWidth] = useState<string>('min-w-full')

  const getAverage = (array: number[]) => array.reduce((sum, currentValue) => sum + currentValue, 0) / array.length

  useEffect(() => {
    const getTabCols = function (el: HTMLElement) {
      if (!el) return ''
      const tablist = el
      const buttonChildren = [...tablist.children]

      const averageCharCount = getAverage(
        buttonChildren?.map((bc) => {
          return (bc as HTMLElement)?.innerText?.length
        }),
      )
      if (averageCharCount < 5) {
        //3 letter acronyms
        return 'auto-cols-[minmax(8%,_1fr)]'
      }
      if (averageCharCount > 5) {
        return 'auto-cols-[minmax(29%,1fr)] xl:auto-cols-[minmax(21%,1fr)] 3xl:auto-cols-[minmax(min-content,1fr)]'
      }
      return ''
    }
    const container = tabListRef?.current
    if (container) {
      setAverageTabWidth(getTabCols(container))
      window.addEventListener('resize', () => setAverageTabWidth(getTabCols(container)))
      return () => {
        window.removeEventListener('resize', () => setAverageTabWidth(getTabCols(container)))
      }
    }
  }, [tabListRef])

  return (
    <RadixTabs.List
      ref={combinedRef}
      className={twMerge(
        `group/tablist relative grid w-full grid-flow-col-dense grid-rows-1 overflow-x-auto ${averageTabWidth} no-scrollbar place-content-start`,
        className,
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </RadixTabs.List>
  )
})
