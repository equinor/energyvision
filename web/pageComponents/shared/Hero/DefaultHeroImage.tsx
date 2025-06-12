import type { ImageWithCaptionData } from '../../../types/index'
import Image, { getPxSmSizes } from '../SanityImage'
import { Caption } from '../image/Caption'

type HeroImageProps = {
  data: ImageWithCaptionData
  className?: string
}

const DefaulHeroImage = ({ data, className }: HeroImageProps) => {
  const { image, caption, attribution } = data
  return (
    <figure className={className}>
      <Image maxWidth={1420} aspectRatio={'2:1'} image={image} sizes={getPxSmSizes()} priority className="rounded-xs" />
      <Caption caption={caption} attribution={attribution} />
    </figure>
  )
}

export default DefaulHeroImage
