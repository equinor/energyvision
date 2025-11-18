import type { ImageWithCaptionData } from '../../types/index'
import { Image } from '../../core/Image/Image'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'

type HeroImageProps = {
  data: ImageWithCaptionData
  className?: string
}

const DefaulHeroImage = ({ data, className }: HeroImageProps) => {
  const { image, caption, attribution } = data
  return (
    <figure className={className}>
      <Image aspectRatio={'2:1'} image={image} grid="md" priority className="rounded-xs" />
      {(caption || attribution) && (
        <FigureCaption className={'mx-auto px-layout-sm pt-0 pb-8'}>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  )
}

export default DefaulHeroImage
