import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../Typography'

export type FigureCaptionProps = {
  /** Set text size
   * @default xs
   */
  textSize?: 'xs' | 'base'
  caption?: string
  attribution?: string
  /** Sets px-layout-sm lg:px-layout-lg on figcaption
   * @default true
   */
  withLayoutPx?: boolean
} & HTMLAttributes<HTMLElement>

export const FigureCaption = forwardRef<HTMLElement, FigureCaptionProps>(
  function FigureCaption(
    {
      textSize = 'xs',
      caption,
      attribution,
      withLayoutPx = true,
      className = '',
    },
    ref,
  ) {
    //pb is taken care of in parent container with sibling figure
    return (
      <figcaption
        ref={ref}
        className={twMerge(
          `max-w-prose pt-2 pb-4 leading-misty dark:text-white-100 ${textSize === 'xs' ? 'text-xs' : 'text-base'}
          ${withLayoutPx ? 'px-layout-sm lg:px-layout-lg' : ''}
          `,
          className,
        )}
      >
        {(caption || attribution) && (
          <Typography group='plain' variant='div' className='leading-normal'>
            {caption}
            {`${caption && attribution ? ' ' : ''}`}
            {attribution}
          </Typography>
        )}
      </figcaption>
    )
  },
)
