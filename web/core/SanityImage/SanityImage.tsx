import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { urlFor } from '../../common/helpers'
import Image, { ImageProps } from 'next/image'
import type { ImageWithAlt } from 'types'

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  image: ImageWithAlt | SanityImageObject
  maxWidth?: number
  aspectRatio?: number
  alt?: string
}

export enum Ratios {
  THREE_TO_TEN = 0.3,
  NINETEEN_TO_FORTY = 0.475,
  ONE_TO_TWO = 0.5,
  SIXTEEN_TO_NINE = 1.77,
  NINE_TO_SIXTEEN = 0.5625,
  THREE_TO_FOUR = 0.75,
  FOUR_TO_FIVE = 0.8,
  ONE_TO_ONE = 1,
  FIVE_TO_FOUR = 1.25,
  FOUR_TO_THREE = 1.33,
}

const DEFAULT_SIZES = '(max-width: 800px) 100vw, 800px'
const DEFAULT_MAX_WIDTH = 1440

const SanityImage = ({
  image,
  width = 1440,
  aspectRatio = Ratios.SIXTEEN_TO_NINE,
  sizes = DEFAULT_SIZES,
  ...rest
}: Props) => {
  if (!image?.asset) return <></>

  const imageHeight = Math.round(Number(width) / aspectRatio)

  const imageUrl = urlFor(image).width(Number(width)).height(imageHeight).quality(100).url()

  const getAltText = () => {
    if ('alt' in image && image.alt) {
      return image.alt
    } else {
      return ''
    }
  }

  return (
    <Image
      {...rest}
      src={imageUrl}
      fill
      alt={getAltText()}
      sizes={sizes}
      className="w-full h-auto object-cover"
      loader={({ width, quality = 100 }) => {
        return urlFor(image).width(width).height(imageHeight).quality(quality).url()
      }}
    />
  )
}

export default SanityImage
