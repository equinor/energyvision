import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageBuilderOptions, ImageUrlBuilder } from 'next-sanity-image'
import { sanityClient } from '../../lib/sanity.server'
import type { ImageWithAlt } from '../../types/types'

declare const VALID_LAYOUT_VALUES: readonly ['fill', 'fixed', 'intrinsic', 'responsive', undefined]
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number]

type ImgProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading' | 'style'
> & {
  image: ImageWithAlt
  layout?: LayoutValue
  maxWidth: number
  aspectRatio?: number
  placeholder?: 'empty' | 'blur'
  unoptimized?: boolean
  priority?: boolean
}

const getHeightByAspectRatio = (options: UseNextSanityImageBuilderOptions, maxWidth: number, aspectRatio: number) => {
  return (
    (options.width && Math.round(options.width * aspectRatio)) ||
    Math.min(Math.round(options.originalImageDimensions.width * aspectRatio), maxWidth * aspectRatio)
  )
}

export const SanityImgLoader = (
  imageUrlBuilder: ImageUrlBuilder,
  options: UseNextSanityImageBuilderOptions,
  maxWidth: number,
  aspectRatio?: number,
): ImageUrlBuilder => {
  if (!aspectRatio) {
    return imageUrlBuilder
      .width(options.width || Math.min(options.originalImageDimensions.width, maxWidth))
      .auto('format')
      .quality(70)
  }

  return imageUrlBuilder
    .width(options.width || Math.min(options.originalImageDimensions.width, maxWidth))
    .height(getHeightByAspectRatio(options, maxWidth, aspectRatio))
    .auto('format')
    .quality(70)
}

//Test
/* const customImageUrlBuilder = (imageUrlBuilder, options) => {
  return imageUrlBuilder
    .width(options.width || Math.min(options.originalImageDimensions.width, 800))
    .blur(20)
    .flipHorizontal()
    .saturation(-100)
    .fit('clip')
} */

// Couldn't make it work with ...props due to TypesScript
const Image = ({
  image,
  sizes,
  layout = 'responsive',
  maxWidth,
  aspectRatio,
  placeholder,
  unoptimized = false,

  ...rest
}: ImgProps) => {
  const imageProps = useNextSanityImage(
    sanityClient,
    image,
    /* { imageBuilder: customImageUrlBuilder }  */ {
      imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, maxWidth, aspectRatio),
    },
  )

  if (!imageProps) return null

  const altTag = image?.isDecorative ? '' : image?.alt || ''

  // https://github.com/bundlesandbatches/next-sanity-image#fill-layout
  if (layout === 'fill') {
    return <Img src={imageProps.src} alt={altTag} sizes={sizes} layout={layout} placeholder={placeholder} />
  }

  return (
    <Img
      {...rest}
      {...imageProps}
      alt={altTag}
      sizes={sizes}
      layout={layout}
      placeholder={placeholder}
      unoptimized={unoptimized}
    />
  )
}

/* const Image = (image) => {
  const imageProps = useNextSanityImage(sanityClient, image.image)

  return <Img {...imageProps} layout="responsive" sizes="(max-width: 800px) 100vw, 800px" />
}
 */
export default Image
