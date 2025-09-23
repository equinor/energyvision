'use client'
import { ElementType, forwardRef, HTMLAttributes } from 'react'

export type ListProps = {
  /**
   * HTML list element to render
   * @default "ul"
   */
  as?: ElementType
  children?: React.ReactNode
  className?: string
} & HTMLAttributes<HTMLUListElement | HTMLOListElement>
/** Regular link style for use*/
export const List = forwardRef<HTMLParagraphElement, ListProps>(function List({ children, as: providedAs }, ref) {
  const ListTag = providedAs ?? (`ul` as React.ElementType)
  return (
    <ListTag
      className={`max-w-text dark:text-white-100 ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'} my-5 pl-6 *:my-2 *:ml-2 *:pl-1.5 *:text-sm *:first:mt-0 *:last:mb-0 [:where(ol_ol_ol)]:[list-style-type:lower-roman] [:where(ol_ol):not(ol_ol_ol)]:[list-style-type:lower-alpha] prose-article:[&:where(ul,ol):not(ul_ul,ul_ol,ol_ol,ol_ul)]:mx-layout-lg`}
      ref={ref}
    >
      {children}
    </ListTag>
  )
})
