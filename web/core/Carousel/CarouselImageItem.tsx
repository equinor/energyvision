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
        `
        aspect-4/5
        lg:aspect-video
        relative
        h-full
        ${!active && displayMode === 'single' ? 'opacity-60' : ''}
        transform-all
        shrink-0
        ${displayMode === 'scroll' ? 'snap-start scroll-ml-6' : 'w-[80%]'}
        `,
        className,
      )}
    >
      <Image maxWidth={1420} image={image} fill className="rounded-sm" />
      {caption && <Caption caption={caption} attribution={attribution} />}
    </li>
  )
})
