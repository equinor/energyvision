import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Content of the list item
   */
  children: React.ReactNode
  /**
   * Override list item styling
   */
  className?: string
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({ className = '', children, ...rest }, ref) => {
  return (
    <li {...rest} ref={ref} className={twMerge('', className)}>
      {children}
    </li>
  )
})

ListItem.displayName = 'List.Item'
export default ListItem
