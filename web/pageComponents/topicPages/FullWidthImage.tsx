import type { FullWidthImageData } from '../../types/types'
import Image, { Ratios } from '../shared/SanityImage'
import { StyledCaption } from '../shared/image/StyledCaption'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'

type TeaserProps = {
  data: FullWidthImageData
  anchor?: string
}

const FullWidthImage = ({ data, anchor }: TeaserProps) => {
  const { image, attribution, caption } = data.image
  const { aspectRatio } = data.designOptions
  const isMobile = useMediaQuery(`(max-width: 750px)`)

  const ratio = isMobile || aspectRatio === Ratios.ONE_TO_TWO ? Ratios.ONE_TO_TWO : Ratios.THREE_TO_TEN

  if (!image) return null
  return (
    <>
      <Image id={anchor} image={image} maxWidth={2000} aspectRatio={ratio} sizes="100vw" alt={image.alt} />
      {image.asset && <StyledCaption caption={caption} attribution={attribution} />}
    </>
  )
}

export default FullWidthImage
