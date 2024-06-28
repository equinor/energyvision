import envisTwMerge from '../../twMerge'
import Image from '../../pageComponents/shared/SanityImage'
import { ImageWithAlt, ImageWithCaptionData } from '../../types/types'
import { DisplayModes } from './Carousel'
import { Caption } from '@components/FigureCaption/Caption'
//import { usePrefersReducedMotion } from '../../common/hooks/usePrefersReducedMotion'

type CarouselType = {
  image?: ImageWithAlt | ImageWithCaptionData
  displayMode?: DisplayModes
  className?: string
  aspectRatio?: string
  caption?: string
  attribution?: string
  active?: boolean
}

export const CarouselImageItem = ({
  image,
  caption,
  attribution,
  displayMode = 'scroll',
  aspectRatio = '16:9',
  className = '',
  ...rest
}: CarouselType) => {
  return (
    <li role="group" aria-roledescription="slide" className={envisTwMerge(``, className)} {...rest}>
      <Image maxWidth={1420} image={image} />
      {caption && <Caption caption={caption} attribution={attribution} />}
    </li>
  )
}
