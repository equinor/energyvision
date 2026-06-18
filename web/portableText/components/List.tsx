'use client'
import { type ElementType, forwardRef, type HTMLAttributes } from 'react'
import type { TypographyGroups } from '@/core/Typography/variants'
import { twMerge } from '@/lib/twMerge/twMerge'

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
      className={twMerge(
        `my-5 max-w-text pl-6 text-base *:my-2 *:ml-2 *:pl-1.5 *:first:mt-0 *:last:mb-0 dark:text-white-100 [:where(h2+*,h3+*)]:mt-0 [:where(li_>_ul):not(li_>_ul_>_li_>_ul)]:list-[circle] [:where(li_>_ul_>_li_>_ul)]:list-[square]`,
        ListTag === 'ul' && 'list-disc',
        ListTag === 'ol' && 'list-decimal',
        group &&
          group === 'article' &&
          '[:not(li_>_ul)]:mx-layout-sm lg:[:not(li_>_ul)]:mx-layout-lg',
      )}
      ref={ref}
    >
      {children}
    </ListTag>
  )
})
