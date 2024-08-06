import PageHeadliner from '@sections/PageSections/PageHeadliner'
import PageItem from '@sections/PageSections/PageItem'
import { CSSProperties, forwardRef, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CardData } from '../../types/types'

type PageSectionsProps = {
  items?: CardData[]
  className?: string
}

const PageSections = forwardRef<HTMLDivElement, PageSectionsProps>(function PageSections(
  { items = [], className = '', ...rest },
  ref,
) {
  const headliner = items.slice(0, 1)
  const restOfItems = items.slice(1)

  const scrollContainer = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: items?.length,
    getScrollElement: () => scrollContainer.current,
    estimateSize: () => 120,
    overscan: 5,
  })

  return (
    <div ref={ref}>
      {headliner?.length > 0 && <PageHeadliner data={headliner[0]} />}
      {restOfItems?.length > 0 && (
        <div ref={scrollContainer} className="h-full flex flex-col gap-4 overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
            className="w-full relative"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const index = virtualRow.index
              const item = restOfItems[index]
              const styleProps: CSSProperties = {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: index === 0 ? '350px' : `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }
              return <PageItem key={index} data={item} style={styleProps} />
            })}
          </div>
        </div>
      )}
    </div>
  )
})

export default PageSections
