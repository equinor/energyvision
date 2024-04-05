import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type FigureCaptionProps = {
  size?: 'small' | 'medium'
} & HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(function FigureCaption({
  size = 'small',
  children,
  className,
  ...rest
}) {
  return (
    <figcaption
      className={twMerge(
        `max-w-prose mt-2 leading-misty text-slate ${size === 'small' ? 'text-xs' : 'text-base'} figCaption`,
        className,
      )}
      {...rest}
    >
      {children}
    </figcaption>
  )
})
