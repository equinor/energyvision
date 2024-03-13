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
  ({ children, className = '', headingClassName = '', as: ListTag = 'ul', title, headingTag = 'h3', ...rest }, ref) => {
    const ariaId = useId('eds-list')
    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge(
          `
        ${ListTag === 'ul' ? 'list-disc' : 'list-decimal'}
        `,
          className,
        )}
      >
        {title && (
          <Typography id={`heading-${ariaId}`} variant={headingTag as TypographyVariants} className={headingClassName}>
            {title}
          </Typography>
        )}
        <ListTag
          aria-labelledby={title && `heading-${ariaId}`}
          className={twMerge(`${ListTag === 'ul' ? 'list-disc' : 'list-decimal'}`, className)}
        >
          {children}
        </ListTag>
      </div>
    )
  },
) as ListComponent

List.Item = ListItem

export default List
