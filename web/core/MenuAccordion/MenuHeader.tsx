import { forwardRef, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Accordion } from '@/core/Accordion';
import type { Variants } from './MenuAccordion';

export type MenuHeaderProps = {
  children?: ReactNode;
  variant?: Variants;
  className?: string;
  id?: string;
};

export const MenuHeader = forwardRef<HTMLButtonElement, MenuHeaderProps>(
  function MenuHeader(
    { children, variant = 'default', className = '', id },
    ref,
  ) {
    const variantClassName: Partial<Record<Variants, string>> = {
      default: ``,
      simple: '',
    };

    return (
      <Accordion.Header
        id={id}
        ref={ref}
        variant={variant === 'simple' ? 'simpleMenu' : 'menu'}
        className={twMerge(`${variantClassName[variant]}`, className)}
      >
        {children}
      </Accordion.Header>
    );
  },
);
