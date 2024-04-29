import { twMerge } from 'tailwind-merge'
import { Fragment, HTMLAttributes, forwardRef } from 'react'
import { mapGridContent } from './mapGridContent'

export type ThreeColumnsProps = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const ThreeColumns = forwardRef<HTMLDivElement, ThreeColumnsProps>(function ThreeColumns(
  { data, className = '' },
  ref,
) {
  const { columns = [] } = data
  const borderStyling = `border border-moss-green-60`
  return (
    <Fragment ref={ref}>
      {columns.map((column: any) => {
        return (
          <div key={column?.id} className={twMerge(borderStyling, className)}>
            {mapGridContent(column)}
          </div>
        )
      })}
    </Fragment>
  )
})

export default ThreeColumns
