import { twMerge } from 'tailwind-merge'
import { Fragment, HTMLAttributes, forwardRef } from 'react'
import { mapGridContent } from './mapGridContent'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

export type ThreeColumnsProps = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const ThreeColumns = forwardRef<HTMLDivElement, ThreeColumnsProps>(function ThreeColumns(
  { data, className = '' },
  ref,
) {
  const { columns = [] } = data
  const borderStyling = `w-full h-full border border-moss-green-60`
  const minHeight = 'min-h-[350px]'
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  return (
    <Fragment ref={ref}>
      {columns.map((column: any) => {
        return (
          <div key={column?.id} className={twMerge(minHeight, borderStyling, className)}>
            {mapGridContent(column, 'threeColumns', isMobile)}
          </div>
        )
      })}
    </Fragment>
  )
})

export default ThreeColumns
