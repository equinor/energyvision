import envisTwMerge from '../../twMerge'
import Image from '../../pageComponents/shared/SanityImage'
import { ImageWithAlt, ImageWithCaptionData } from '../../types/types'
import { DisplayModes } from './Carousel'
import { Caption } from '@components/FigureCaption/Caption'
import { forwardRef } from 'react'
//import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

type CarouselImageItemProps = {
  image?: ImageWithAlt | ImageWithCaptionData
  displayMode?: DisplayModes
  className?: string
  aspectRatio?: string
  caption?: string
  attribution?: string
  active?: boolean
}

export const CarouselImageItem = forwardRef<HTMLLIElement, CarouselImageItemProps>(function CarouselImageItem(
  {
    active = false,
    image,
    caption,
    attribution,
    displayMode = 'scroll',
    aspectRatio = '16:9',
    className = '',
    ...rest
  },
  ref,
) {
  console.log('caption', caption)
  console.log('attribution', attribution)
  return (
    <li
      {...rest}
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={envisTwMerge(
        `aspect-4/5
        lg:aspect-video
        relative
        h-full
        ${!active && displayMode === 'single' ? 'opacity-30' : ''}
        transition-opacity
        duration-1000
        ease-[ease]
        ${
          displayMode === 'scroll'
            ? 'snap-start scroll-ml-6 shrink-0'
            : 'w-[980px] ms-2 me-2 col-start-1 col-end-1 row-start-1 row-end-1'
        }
        `,
        className,
      )}
    >
      <figure className="relative w-full h-full">
        <Image maxWidth={1420} image={image} fill className="rounded-md" />
        <figcaption className="absolute bottom-0 left-0 pt-[200px] black-to-top-gradient">
          <div className="ms-8 mb-8">
            {`${caption ? caption : ''}${caption && attribution ? '. ' : ''}${attribution ? attribution : ''}`}
          </div>
        </figcaption>
      </figure>
    </li>
  )
})
