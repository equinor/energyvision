import { useNextSanityImage } from 'next-sanity-image'
import Img, { ImageProps } from 'next/image'

import type { ImageWithAlt } from 'types'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  image: ImageWithAlt
  maxWidth?: number
  aspectRatio?: number
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

const useSanityLoader = (image: ImageWithAlt, maxWidth: number, aspectRatio: number | undefined) =>
  useNextSanityImage(sanityClientWithEquinorCDN, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      const { width: imageWidth, croppedImageDimensions: cropped } = options
      // We do not want to allow gigantic images to exist due to performance
      const width = Math.round(imageWidth || Math.min(maxWidth, cropped.width))
      const height = aspectRatio
        ? Math.round(width * aspectRatio)
        : Math.round(width * (cropped.height / cropped.width))

      return imageUrlBuilder.width(width).height(height).quality(70)
    },
  })

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
      style: { ...style, width: '100%', height: 'auto' },
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
