import type { ImageWithCaptionData } from '../../types/index'
import Image, { getPxSmSizes } from '../../core/SanityImage/SanityImage'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'

type HeroImageProps = {
  data: ImageWithCaptionData
  className?: string
}

const DefaulHeroImage = ({ data, className }: HeroImageProps) => {
  const { image, caption, attribution } = data
  return (
    <figure className={className}>
      <Image maxWidth={1420} aspectRatio={'2:1'} image={image} sizes={getPxSmSizes()} priority className="rounded-xs" />
      {(caption || attribution) && (
        <FigureCaption className={'mx-auto max-w-viewport px-layout-sm pt-0 pb-8'}>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  )
}

export default DefaulHeroImage
