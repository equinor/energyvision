import React from 'react'
import { forwardRef, HTMLAttributes } from 'react'

export type FigureCaptionProps = {
  size?: 'small' | 'medium'
} & HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(function FigureCaption({
  size = 'small',
  children,
  ...rest
}) {
  return (
    <figcaption
      className={`max-w-prose mt-sm text-slate ${size === 'small' ? 'text-xs' : 'text-base'} figCaption`}
      {...rest}
    >
      {children}
    </figcaption>
  )
})
