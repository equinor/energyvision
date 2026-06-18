import { forwardRef, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography, type TypographyVariants } from '../Typography'
import { ListItem } from './ListItem'
import type { ListProps } from './types'

export interface ListComponent
  extends React.ForwardRefExoticComponent<
    ListProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link ListItemProps}
   */
  Item: typeof ListItem
}

export const List = forwardRef<HTMLDivElement, ListProps>(
  (
    {
      children,
      className = '',
      headingClassName = '',
      as: ListTag = 'ul',
      title,
      headingTag = 'h3',
      split = false,
      listClassName = '',
      ...rest
    },
    ref,
  ) => {
    const ariaId = useId()
    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(`text-slate-80 dark:text-white-100`, className)}
      >
        {title && (
          <Typography
            id={ariaId}
            variant={headingTag as TypographyVariants}
            className={headingClassName}
          >
            {title}
          </Typography>
        )}
        <ListTag
          aria-labelledby={title && `${ariaId}`}
          className={twMerge(
            `list-inside ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'}
          ${split ? 'items-end gap-x-8 gap-y-6 md:grid md:grid-cols-2' : ''}`,
            listClassName,
          )}
        >
          {children}
        </ListTag>
      </div>
    )
  },
) as ListComponent

List.Item = ListItem

export default List
