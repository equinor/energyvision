import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type MediaPosition = 'left' | 'right'

export type TeaserMediaProps = {
  /** If the image is of type SVG it can have a small size */
  size?: 'small' | 'full'
  /** Should the height be fixed for small screens */
  fixedHeight?: boolean
  /** If the media is smaller than the container, it can be centered with the content  */
  center?: boolean
  mediaPosition?: MediaPosition
} & HTMLAttributes<HTMLDivElement>

export const Media = forwardRef<HTMLDivElement, TeaserMediaProps>(function Media(
  { size = 'full', className, mediaPosition = 'left', fixedHeight = true, center = false, children, ...rest },
  ref,
) {
  return (
    <div
      className={twMerge(
        `${mediaPosition == 'right' ? 'md:order-last' : ''} relative ${fixedHeight ? 'h-[400px]' : ''} ${
          center ? 'text-center justify-center place-self-center' : ''
        } md:h-full md:max-h-[800px] ${size == 'small' ? 'w-[55%] pt-12' : 'w-full'}`,
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
})
