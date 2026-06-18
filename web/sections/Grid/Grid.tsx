import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import type { GridData, GridRowType } from '../../types/index'
import Span2And1 from './Span2And1'
import Span3 from './Span3'
import ThreeColumns from './ThreeColumns'

export type GridProps = {
  data: GridData
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { data, anchor, className = '' },
  ref,
) {
  const { gridRows = [] } = data
  const getRowType = (row: GridRowType) => {
    switch (row?.type) {
      case 'span3':
        return <Span3 key={row?.id} data={row} />
      case 'span2and1':
        return <Span2And1 key={row?.id} data={row} />
      case 'threeColumns':
        return <ThreeColumns key={row?.id} data={row} />
      default:
        break
    }
  }

  return (
    <section
      ref={ref}
      className={twMerge(
        `mx-auto grid w-full max-w-[2200px] auto-rows-max grid-cols-1 pb-page-content lg:grid-cols-3 lg:px-layout-md`,
        className,
      )}
      id={anchor}
    >
      {gridRows.map(row => {
        return getRowType(row)
      })}
    </section>
  )
})

export default Grid
