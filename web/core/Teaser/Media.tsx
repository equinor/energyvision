import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type MediaPosition = 'left' | 'right'

export type TeaserMediaProps = {
  /** If the image is of type SVG it can have a small size */
  size?: 'small' | 'full'
  /** If the media is smaller than the container, it can be centered with the content  */
  center?: boolean
  mediaPosition?: MediaPosition
} & HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, TeaserMediaProps>(function Media(
  { size = 'full', className, mediaPosition = 'left', center = false, children, ...rest },
  ref,
) {
  return (
    <div
      className={twMerge(
        `relative ${center ? 'text-center place-self-center' : ''} h-full max-h-[400px] lg:max-h-[800px] ${
          size == 'small' ? 'w-[55%] pt-12' : 'w-full'
        }`,
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
})
