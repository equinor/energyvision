import type { FullWidthImageData } from '../../types/types'
import Image from '../shared/Image'
import { StyledCaption } from '../shared/image/StyledCaption'
import { Ratios } from '../shared/SanityImage'

type TeaserProps = {
  data: FullWidthImageData
  anchor?: string
}

const FullWidthImage = ({ data, anchor }: TeaserProps) => {
  const { image, attribution, caption } = data.image
  if (!image) return null
  return (
    <>
      <Image
        id={anchor}
        image={image}
        maxWidth={2000}
        aspectRatio={Ratios.THREE_TO_TEN}
        sizes="100vw"
        alt={image.alt}
        layout="responsive"
      />
      {image.asset && <StyledCaption caption={caption} attribution={attribution} />}
    </>
  )
}

export default FullWidthImage
