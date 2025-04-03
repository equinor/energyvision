import { forwardRef, useState } from 'react'
import { PaneMenuItem } from './PaneMenuItem'
import { SubMenuData } from '../../types'

export type MenuPanesProps = {
  menuItems: any[]
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
    <section className="w-full h-full">
      <ul className="relative w-max max-w-[50vw] flex flex-col gap-4">
        {menuItems.map((item, idx: number) => {
          return (
            <PaneMenuItem
              key={item.id}
              index={idx}
              showSecondPane={openPaneId === idx}
              onOpen={handleOpen}
              item={item as SubMenuData}
            />
          )
        })}
      </ul>
    </section>
  )
})
