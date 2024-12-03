import { forwardRef, HTMLAttributes } from 'react'

export type MenuItemColumnsContainerProps = HTMLAttributes<HTMLDivElement>

export const MenuItemColumnsContainer = forwardRef<HTMLDivElement, MenuItemColumnsContainerProps>(
  function MenuItemColumnsContainer({ children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={`pb-8 
      xl:grid 
      xl:grid-cols-[repeat(auto-fill,_minmax(8em,calc(11_*_theme(spacing.md))))]
      xl:grid-rows-[min-content_min-content] 
      xl:gap-y-4 
      xl:gap-x-10 
      xl:grid-flow-col 
    `}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
