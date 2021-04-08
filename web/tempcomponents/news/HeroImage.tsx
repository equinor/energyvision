import Img from 'next/image'
import { imageProps } from '../../common/helpers'
import type { ImageWithCaptionData } from '../../types/types'

type HeroImageProps = {
  data: ImageWithCaptionData
}

const HeroImage = ({ data }: HeroImageProps) => {
  const { image, alt, caption, attribution } = data
  return (
    <figure>
      <Img
        {...imageProps(image, 800, 0.5)}
        sizes="
                    (min-width: 800px) 64rem,
                    (min-width: 1100px) 72rem,
                    (min-width: 1700px) 92rem,
                    1400px
                    "
        alt={alt}
      />
      {caption || attribution ? (
        <figcaption>
          {caption} {attribution}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default HeroImage
