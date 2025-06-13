import type { DesignOptions, ImageWithCaptionData } from '../../types/index'
import Image, { getFullScreenSizes, ImageRatioKeys } from '../shared/SanityImage'
import { Caption } from '../shared/image/Caption'

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio: ImageRatioKeys
  }
}

type FullWidthImageProps = {
  data: FullWidthImageData
  anchor?: string
}

const FullWidthImage = ({ data, anchor }: FullWidthImageProps) => {
  const { image, attribution, caption } = data.image
  const { aspectRatio = '16:9' } = data.designOptions

  if (!image) return null

  return (
    <>
      <Image
        id={anchor}
        image={image}
        sizes={getFullScreenSizes()}
        maxWidth={2000}
        aspectRatio={aspectRatio}
        alt={image.alt}
      />
      {image.asset && <Caption caption={caption} attribution={attribution} />}
    </>
  )
}

export default FullWidthImage
