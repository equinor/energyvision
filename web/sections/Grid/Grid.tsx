import { twMerge } from 'tailwind-merge'
import { GridData } from '../../types/types'
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
        auto-rows-fr
        grid-cols-1
        lg:grid-cols-[1fr_17vw_1fr]
        lg:auto-rows-[minmax(0,_550px)]
        `,
        className,
      )}
      id={anchor}
      {...rest}
    >
      {gridRows.map((row) => {
        return (
          <>
            {row?.type === 'span3' && <Span3 data={row} />}
            {row?.type === 'span2and1' && <Span2And1 data={row} />}
            {row?.type === 'threeColumns' && <ThreeColumns data={row} />}
          </>
        )
      })}
    </section>
  )
})

export default Grid
