import { twMerge } from 'tailwind-merge'
import { Fragment, HTMLAttributes } from 'react'
import { mapGridContent } from './mapGridContent'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

export type Span2And1Props = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const Span2And1 = ({ data, className = '' }: Span2And1Props) => {
  const { singleColumn, span2, alignSpan2Right = false } = data
  const minHeight = 'min-h-[350px] lg:min-h-[600px]'
  const commonStyling = `${minHeight}`
  const borderStyling = `border border-moss-green-60`
  const isMobile = useMediaQuery(`(max-width: 800px)`)

  return (
    <Fragment>
      {alignSpan2Right ? (
        <>
          <div className={twMerge(commonStyling, borderStyling, className)}>
            {mapGridContent(singleColumn?.content, 'span2and1', isMobile)}
          </div>
          <div className={twMerge(`lg:col-span-2`, commonStyling, borderStyling, className)}>
            {mapGridContent(span2?.content, 'span2and1', isMobile)}
          </div>
        </>
      ) : (
        <>
          <div className={twMerge(`lg:col-span-2`, commonStyling, borderStyling, className)}>
            {mapGridContent(span2?.content, 'span2and1', isMobile)}
          </div>
          <div className={twMerge(commonStyling, borderStyling, className)}>
            {mapGridContent(singleColumn?.content, 'span2and1', isMobile)}
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Span2And1
