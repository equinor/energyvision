import { twMerge } from 'tailwind-merge'
import { Fragment, HTMLAttributes } from 'react'
import { mapGridContent } from './mapGridContent'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

export type ThreeColumnsProps = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const ThreeColumns = ({ data, className = '' }: ThreeColumnsProps) => {
  const { columns = [] } = data
  const borderStyling = `w-full h-full border border-moss-green-60`
  const minHeight = 'min-h-[350px] lg:min-h-[600px]'
  const isMobile = useMediaQuery(`(max-width: 800px)`)
  return (
    <Fragment>
      {columns.map((column: any) => {
        return (
          <div key={column?.id} className={twMerge(minHeight, borderStyling, className)}>
            {mapGridContent(column, 'threeColumns', isMobile)}
          </div>
        )
      })}
    </Fragment>
  )
}

export default ThreeColumns
