import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type FigureCaptionProps = {
  size?: 'small' | 'medium'
} & HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(
  function FigureCaption(
    { size = 'small', children, className = '', ...rest },
    ref,
  ) {
    //pb is taken care of in parent container with sibling figure
    return (
      <figcaption
        ref={ref}
        className={twMerge(
          `max-w-prose pt-2 leading-misty dark:text-white-100 ${size === 'small' ? 'text-xs' : 'text-base'}`,
          className,
        )}
        {...rest}
      >
        {children}
      </figcaption>
    )
  },
)
