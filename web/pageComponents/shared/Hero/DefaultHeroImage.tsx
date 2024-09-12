import type { ImageWithCaptionData } from '../../../types/types'
import Image, { Ratios } from '../SanityImage'
import { Caption } from '../image/Caption'

type HeroImageProps = {
  data: ImageWithCaptionData
}

const DefaulHeroImage = ({ data }: HeroImageProps) => {
  const { image, caption, attribution } = data
  return (
    <figure>
      <Image
        maxWidth={1420}
        aspectRatio={Ratios.ONE_TO_TWO}
        image={image}
        sizes="
          (max-width: 340px) 295px,
          (max-width: 600px) 490px,
          (max-width: 800px) 630px,
          (max-width: 1050px) 810px,
          (max-width: 1250px) 950px,
          (max-width: 1450px) 1100px,
          (max-width: 1700px) 1270px,
          1420px
        "
        priority
        className="rounded-xs"
      />
      <Caption caption={caption} attribution={attribution} />
    </figure>
  )
}

export default DefaulHeroImage
