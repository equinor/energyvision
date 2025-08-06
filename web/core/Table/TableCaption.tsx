import { type HTMLAttributes, forwardRef } from 'react'

export type TableCaptionProps = HTMLAttributes<HTMLTableSectionElement>

export const TableCaption = forwardRef<HTMLTableSectionElement, TableCaptionProps>(function TableCaption(rest, ref) {
  return <caption className="text-md text-left caption-top pb-2" ref={ref} {...rest} />
})
