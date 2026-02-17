'use client'
import { forwardRef, useState } from 'react'
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

    const handleOpen = (index: number) => {
      if (index === openPaneId) {
        setOpenPaneId(-1)
      } else {
        setOpenPaneId(index)
      }
    }

    return (
      <section ref={ref}>
        <ul className='relative flex w-max max-w-[50vw] flex-col gap-6 pb-4'>
          {menuItems.map((item, idx: number) => {
            return (
              <PaneMenuItem
                key={item.id}
                index={idx}
                showSecondPane={openPaneId === idx}
                onOpen={handleOpen}
                item={item as SimpleGroupData}
                linkCallback={linkCallback}
              />
            )
          })}
        </ul>
      </section>
    )
  },
)
