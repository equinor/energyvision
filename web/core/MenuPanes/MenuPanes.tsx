'use client'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { twMerge } from '@/lib/twMerge/twMerge'
import type { SimpleGroupData } from '../../types'
import { PaneMenuItem } from './PaneMenuItem'

export type MenuPanesProps = {
  menuItems: SimpleGroupData[]
  currentMenuItemIndex?: string
  linkCallback?: () => void
}

export const MenuPanes = forwardRef<HTMLDivElement, MenuPanesProps>(
  function MenuPanes({ menuItems, currentMenuItemIndex, linkCallback }, ref) {
    const [openPaneId, setOpenPaneId] = useState<number>(
      currentMenuItemIndex ? parseInt(currentMenuItemIndex, 10) : -1,
    )
    const ulRef = useRef<HTMLUListElement>(null)
    const [maxNestedHeight, setMaxNestedHeight] = useState(0)
    const [ulWidth, setUlWidth] = useState(0)

    const handleOpen = (index: number) => {
      if (index === openPaneId) {
        setOpenPaneId(-1)
      } else {
        setOpenPaneId(index)
      }
    }

    useEffect(() => {
      if (ulRef.current) {
        const nestedUls = ulRef.current.querySelectorAll('li > ul')
        let maxHeight = 0
        nestedUls.forEach(ul => {
          const height = (ul as HTMLUListElement).scrollHeight
          if (height > maxHeight) {
            maxHeight = height
          }
        })
        setMaxNestedHeight(maxHeight)
        const widthWithRightPadding = ulRef.current.clientWidth + 56
        setUlWidth(widthWithRightPadding)
      }
    }, [])

    return (
      <section ref={ref} className='h-full'>
        <ul
          ref={ulRef}
          className={twMerge(
            'relative flex w-max max-w-[50vw] flex-col gap-6 pb-4',
            openPaneId !== -1 && 'border-white-100 border-e pr-14',
          )}
          style={{ minHeight: maxNestedHeight || undefined }}
        >
          {menuItems?.map((item, idx: number) => {
            return (
              <PaneMenuItem
                key={item.id}
                index={idx}
                showSecondPane={openPaneId === idx}
                onOpen={handleOpen}
                item={item as SimpleGroupData}
                linkCallback={linkCallback}
                ulWidth={ulWidth}
              />
            )
          })}
        </ul>
      </section>
    )
  },
)
