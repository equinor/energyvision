import { twMerge } from 'tailwind-merge'
import { GridData, GridRowType } from '../../types/types'
import { HTMLAttributes, forwardRef } from 'react'
import Span3 from './Span3'
import Span2And1 from './Span2And1'
import ThreeColumns from './ThreeColumns'

export type GridProps = {
  data: GridData
  anchor?: string
  className?: string
} & HTMLAttributes<HTMLElement>

const Grid = forwardRef<HTMLElement, GridProps>(function Grid({ data, anchor, className = '', ...rest }, ref) {
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
        `px-layout-md 
        max-w-[2200px]
        pb-page-content
        mx-auto
        w-full
        grid
        auto-rows-max
        lg:auto-rows-[minmax(auto,600px)]
        grid-cols-1
        lg:grid-cols-3
        `,
        className,
      )}
      id={anchor}
      {...rest}
    >
      {gridRows.map((row) => {
        return getRowType(row)
      })}
    </section>
  )
})

export default Grid
