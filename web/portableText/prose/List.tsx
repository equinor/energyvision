'use client'
import { ElementType, forwardRef, HTMLAttributes } from 'react'
import { PortableTextBlock } from 'next-sanity'

export type ListProps = {
  /**
   * HTML list element to render
   * @default "ul"
   */
  as?: ElementType
  children?: React.ReactNode
  className?: string
} & HTMLAttributes<HTMLUListElement | HTMLOListElement> &
  PortableTextBlock
/** Regular link style for use*/
export const List = forwardRef<HTMLParagraphElement, ListProps>(function List(
  { children, as: providedAs, className = '' },
  ref,
) {
  const ListTag = providedAs ?? (`ul` as React.ElementType)
  return (
    <ListTag
      className={`[:where(ol ol)]:[list-style-type:lower-alpha] my-5 pl-6 *:my-2 *:ml-2 *:pl-1.5 *:first:mt-0 *:last:mb-0 [:where(ol)]:list-decimal [:where(ul)]:list-disc`}
      ref={ref}
    >
      {children}
    </ListTag>
  )
})

export default List
