import { forwardRef, useState } from 'react'
import { PaneMenuItem } from './PaneMenuItem'
import { SimpleGroupData } from '../../types'

export type MenuPanesProps = {
  menuItems: SimpleGroupData[]
}

export const MenuPanes = forwardRef<HTMLDivElement, MenuPanesProps>(function MenuPanes({ menuItems, ...rest }, ref) {
  const [openPaneId, setOpenPaneId] = useState<number>()

  const handleOpen = (index: number) => {
    if (index === openPaneId) {
      setOpenPaneId(-1)
    } else {
      setOpenPaneId(index)
    }
  }

  return (
    <section ref={ref} {...rest}>
      <ul className="relative w-max max-w-[50vw] flex flex-col gap-6">
        {menuItems.map((item, idx: number) => {
          return (
            <PaneMenuItem
              key={item.id}
              index={idx}
              showSecondPane={openPaneId === idx}
              onOpen={handleOpen}
              item={item as SimpleGroupData}
            />
          )
        })}
      </ul>
    </section>
  )
})
