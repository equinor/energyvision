import { forwardRef } from 'react';
import { Accordion, type AccordionContentProps } from '@/core/Accordion';
import type { Variants } from './MenuAccordion';

export type MenuContentProps = {
  variant?: Variants;
} & Omit<AccordionContentProps, 'variant'>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  function SubMenuPanel(
    { className = '', variant = 'default', children, ...rest },
    ref,
  ) {
    return (
      <Accordion.Content
        variant={variant === 'simple' ? 'simpleMenu' : 'menu'}
        ref={ref}
        className={className}
        forceMount
        {...rest}
      >
        {children}
      </Accordion.Content>
    );
  },
);
