import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Accordion, type AccordionHeaderProps } from '@/core/Accordion'
import type { Variants } from './MenuAccordion'

export type MenuHeaderProps = {
  variant?: Variants
} & Omit<AccordionHeaderProps, 'variant'>

export const MenuHeader = forwardRef<HTMLButtonElement, MenuHeaderProps>(
  function MenuHeader(
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
  },
)
