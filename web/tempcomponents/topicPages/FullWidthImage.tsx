import Img from 'next/image'
import { imageProps } from '../../common/helpers'
import type { FullWidthImageData } from '../../types/types'

type TeaserProps = {
  data: FullWidthImageData
}

const FullWidthImage = ({ data }: TeaserProps) => {
  const { image } = data
  if (!image) return null
  return <Img {...imageProps(image, 2000, 0.3)} sizes="100vw" alt={image.alt} layout="responsive" />
}

export default FullWidthImage
