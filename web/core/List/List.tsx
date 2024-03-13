import { forwardRef } from 'react'
import Typography, { TypographyVariants } from '../Typography'
import { ListItem } from './ListItem'
import { ListProps } from './types'
import { useId } from '@equinor/eds-utils'
import { twMerge } from 'tailwind-merge'

export interface ListComponent
  extends React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>> {
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
      ...rest
    },
    ref,
  ) => {
    const ariaId = useId('envis-list-heading')
    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          `text-slate-80
          dark:text-white-100
        `,
          className,
        )}
      >
        {title && (
          <Typography id={ariaId} variant={headingTag as TypographyVariants} className={headingClassName}>
            {title}
          </Typography>
        )}
        <ListTag
          aria-labelledby={title && `${ariaId}`}
          className={twMerge(
            `list-inside
          ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'}
          ${split ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`,
            className,
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
