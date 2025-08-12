import { type HTMLAttributes, forwardRef } from 'react'
import envisTwMerge from '../../twMerge'
import { InnerContext } from './Inner.context'
import { ThemeVariants, Variants } from './Table'

export type TableBodyProps = {
  /**
   * Variant of table row
   * @default zebra
   */
  variant?: Variants | undefined
  /**
   * Variant of theme
   * @default grey
   */
  themeVariant?: ThemeVariants | undefined
} & HTMLAttributes<HTMLTableSectionElement>

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(function TableBody(
  { variant = 'zebra', themeVariant = 'grey', className = '', ...rest },
  ref,
) {
  return (
    <InnerContext.Provider value={{ variant, themeVariant, section: 'body' }}>
      <tbody ref={ref} className={envisTwMerge(``, className)} {...rest} />
    </InnerContext.Provider>
  )
})
