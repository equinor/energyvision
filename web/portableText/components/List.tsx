'use client'
import { type ElementType, forwardRef, type HTMLAttributes } from 'react'
import type { TypographyGroups } from '@/core/Typography/variants'

export type ListProps = {
  /**
   * HTML list element to render
   * @default "ul"
   */
  as?: ElementType
  children?: React.ReactNode
  className?: string
  group?: TypographyGroups
} & HTMLAttributes<HTMLUListElement | HTMLOListElement>
/** Regular link style for use*/
export const List = forwardRef<HTMLParagraphElement, ListProps>(function List(
  { children, as: providedAs, group },
  ref,
) {
  const ListTag = providedAs ?? (`ul` as React.ElementType)

  return (
    <ListTag
      className={`max-w-text dark:text-white-100 ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'} my-5 pl-6 *:my-2 *:ml-2 *:pl-1.5 *:text-sm *:first:mt-0 *:last:mb-0 ${group && group === 'article' ? '[:not(li_>_ul)]:mx-layout-lg' : ''} [:where(li_>_ul):not(li_>_ul_>_li_>_ul)]:list-[lower-alpha] [:where(li_>_ul_>_li_>_ul)]:list-[lower-roman]`}
      ref={ref}
    >
      {children}
    </ListTag>
  )
})
