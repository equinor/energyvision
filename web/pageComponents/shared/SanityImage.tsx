import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import Img, { ImageProps } from 'next/image'
import type { ImageWithAlt } from 'types'

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  image: ImageWithAlt
  maxWidth?: number
  aspectRatio?: number
  alt?: string
}

export enum Ratios {
  THREE_TO_TEN = 0.3,
  NINETEEN_TO_FORTY = 0.475,
  ONE_TO_TWO = 0.5,
  NINE_TO_SIXTEEN = 0.5625,
  THREE_TO_FOUR = 0.75,
  FOUR_TO_FIVE = 0.8,
  ONE_TO_ONE = 1,
}

const DEFAULT_SIZES = '(max-width: 800px) 100vw, 800px'
const DEFAULT_MAX_WIDTH = 1440

const Image = ({
  image,
  aspectRatio,
  sizes = DEFAULT_SIZES,
  maxWidth = DEFAULT_MAX_WIDTH,
  fill,
  style,
  ...rest
}: Props) => {
  const imageProps = useSanityLoader(image, maxWidth, aspectRatio)
  if (!image?.asset) return <></>
  const { width, height, src } = imageProps

  let props = {}

  if (fill) {
    // Layout fill
    props = {
      fill,
      style: { ...style, objectFit: 'cover' },
    }
  } else {
    // Layout responsive
    props = {
      width,
      height,
      style: { ...style, display: 'flex', width: '100%', height: 'auto' },
    }
  }

  return (
    <Img
      {...rest}
      {...props}
      src={src}
      alt={image.isDecorative ? '' : image.alt ?? ''}
      role={image.isDecorative ? 'presentation' : undefined}
      sizes={sizes}
    />
  )
}

export default Image
