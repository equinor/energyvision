'use client';
import {
  type AccordionContentProps as _AccordionContentProps,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { AnimatePresence, motion } from 'framer-motion';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useMediaQuery } from '../../lib/hooks/useMediaQuery';
import type { Variants } from './Accordion';

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type ContentElementProps = ComponentPropsWithoutRef<'div'> & {
  'data-state'?: 'open' | 'closed';
};

const ContentElement = forwardRef<HTMLDivElement, ContentElementProps>(
  function ContentElement({ 'data-state': state, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        data-state={state}
        aria-hidden={state === 'closed'}
      />
    );
  },
);

export type AccordionContentProps = {
  variant?: Variants;
} & _AccordionContentProps;

export const Content = forwardRef<HTMLDivElement, AccordionContentProps>(
  function Content(
    { variant = 'primary', children, className = '', ...rest },
    ref,
  ) {
    const useComplex = useMediaQuery(`(min-width: 1280px)`);

    const variantClassName: Partial<Record<Variants, string>> = {
      primary: `grid grid-rows-[0fr] overflow-hidden
    data-closed:invisible
    data-open:visible
    data-open:grid-rows-[1fr]
    motion-safe:data-closed:[transition:visibility_0s_300ms]
    motion-safe:data-closed:animate-accordionContentClose
    motion-safe:data-open:animate-accordionContentOpen`,
      menu: `max-xl:overflow-hidden
    max-xl:data-closed:h-0
    data-closed:invisible
    data-open:visible
    max-xl:data-open:[transition-delay:0s]
    max-xl:[transition:visibility_0s_0.2s]
    max-xl:motion-safe:data-closed:animate-slideDown
    max-xl:motion-safe:data-open:animate-slideUp

    `,
      simpleMenu: `max-xl:overflow-hidden
    max-xl:data-closed:h-0
    data-closed:invisible
    data-open:visible
    max-xl:data-open:[transition-delay:0s]
    max-xl:[transition:visibility_0s_0.2s]
    max-xl:motion-safe:data-closed:animate-slideDown
    max-xl:motion-safe:data-open:animate-slideUp`,
    };

    const getVariantBody = () => {
      switch (variant) {
        case 'menu':
          return useComplex ? (
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                transition={{ duration: 0.3 }}
                className="absolute top-[260px] right-0 left-0 mx-auto bg-white-100"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          ) : (
            <>{children}</>
          );
        case 'simpleMenu':
          return <div className="py-6 pl-4 xl:py-10">{children}</div>;

        default:
          return (
            <div className="min-h-0 overflow-hidden">
              <div className="mb-6 ml-2.5 flex flex-col gap-6 border-slate-80 border-l border-dashed pt-0 pr-4 pb-6 pl-7 dark:border-white-100">
                {children}
              </div>
            </div>
          );
      }
    };

    return (
      <AccordionContent {...rest} asChild>
        <ContentElement
          ref={ref}
          className={twMerge(`${variantClassName[variant]}`, className)}
        >
          {getVariantBody()}
        </ContentElement>
      </AccordionContent>
    );
  },
);
