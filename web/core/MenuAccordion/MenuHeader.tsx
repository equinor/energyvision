import { forwardRef } from 'react'
import { Variants } from './MenuAccordion'
import { Accordion, AccordionHeaderProps } from '@/core/Accordion'
import { twMerge } from 'tailwind-merge'

export type MenuHeaderProps = {
  variant?: Variants
} & Omit<AccordionHeaderProps, 'variant'>

export const MenuHeader = forwardRef<HTMLButtonElement, MenuHeaderProps>(function MenuHeader(
  { children, variant = 'default', className = '', ...rest },
  ref,
) {
  const variantClassName: Partial<Record<Variants, string>> = {
    default: ``,
    simple: '',
  }

  return (
    <Accordion.Header
      {...rest}
      ref={ref}
      variant={variant === 'simple' ? 'simpleMenu' : 'menu'}
      className={twMerge(`${variantClassName[variant]}`, className)}
    >
      {children}
    </Accordion.Header>
  )
})
