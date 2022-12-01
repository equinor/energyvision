import { StyledCaption } from '../shared/image/StyledCaption'
import type { FullWidthImageDataV2 } from '../../types/types'
import Image from '../shared/Image'

type TeaserProps = {
  data: FullWidthImageDataV2
  anchor?: string
}

const FullWidthImageV2 = ({ data, anchor }: TeaserProps) => {
  const { image, attribution, caption } = data.image
  if (!image) return null
  return (
    <>
      <Image
        id={anchor}
        image={image}
        maxWidth={2000}
        aspectRatio={0.3}
        sizes="100vw"
        alt={image.alt}
        layout="responsive"
      />
      {image.asset && <StyledCaption caption={caption} attribution={attribution} />}
    </>
  )
}

export default FullWidthImageV2
