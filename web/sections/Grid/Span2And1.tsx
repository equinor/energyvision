import { twMerge } from 'tailwind-merge'
import { Fragment, HTMLAttributes, forwardRef } from 'react'
import { mapGridContent } from './mapGridContent'

export type Span2And1Props = {
  data: any
  className?: string
} & HTMLAttributes<HTMLDivElement>

const Span2And1 = forwardRef<HTMLDivElement, Span2And1Props>(function Span2And1({ data, className = '' }, ref) {
  const { singleColumn, span2, alignSpan2Right = false } = data
  const borderStyling = `shadow-md` //`border border-moss-green-60`
  return (
    <Fragment ref={ref}>
      {alignSpan2Right ? (
        <>
          <div className={twMerge(borderStyling, className)}>{mapGridContent(singleColumn?.content)}</div>
          <div className={twMerge(`lg:col-span-2 ${borderStyling}`, className)}>{mapGridContent(span2?.content)}</div>
        </>
      ) : (
        <>
          <div className={twMerge(`lg:col-span-2 ${borderStyling}`, className)}>{mapGridContent(span2?.content)}</div>
          <div className={twMerge(borderStyling, className)}>{mapGridContent(singleColumn?.content)}</div>
        </>
      )}
    </Fragment>
  )
})

export default Span2And1
