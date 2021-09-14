import type { FullWidthImageData } from '../../types/types'
import Image from '../shared/Image'

type TeaserProps = {
  data: FullWidthImageData
}

const FullWidthImage = ({ data }: TeaserProps) => {
  const { image } = data
  if (!image) return null
  return <Image image={image} maxWidth={2000} aspectRatio={0.3} sizes="100vw" alt={image.alt} layout="responsive" />
}

export default FullWidthImage
