import { useNextSanityImage } from 'next-sanity-image'
import Img from 'next/image'

import type { ImageWithAlt } from 'types'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'

type Props = Omit<JSX.IntrinsicElements['img'], 'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading' | 'style'> & {
  image: ImageWithAlt
  maxWidth?: number
  aspectRatio?: number
  placeholder?: 'empty' | 'blur'
  priority?: boolean
  style?: React.CSSProperties
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

const defaultSizes = '(max-width: 800px) 100vw, 800px'
const defaultMaxWidth = 1440

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

const Image = ({ image, aspectRatio, sizes = defaultSizes, maxWidth = defaultMaxWidth, ...rest }: Props) => {
  const imageProps = useSanityLoader(image, maxWidth, aspectRatio)
  if (!image?.asset) return <></>
  imageProps.src += '&width=0'

  return (
    <Img
      {...rest}
      {...imageProps}
      sizes={sizes}
      alt={image.isDecorative ? '' : image.alt ?? ''}
      role={image.isDecorative ? 'presentation' : undefined}
    />
  )
}

export default Image
