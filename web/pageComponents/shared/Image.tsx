import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageBuilderOptions, ImageUrlBuilder } from 'next-sanity-image'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'
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
  objectFit?: 'cover' | 'contain'
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

// Couldn't make it work with ...props due to TypesScript
const Image = ({
  image,
  sizes,
  layout = 'responsive',
  maxWidth,
  aspectRatio,
  placeholder,
  unoptimized = false,
  objectFit,
  ...rest
}: ImgProps) => {
  const imageProps = useNextSanityImage(
    sanityClientWithEquinorCDN,
    image,
    /* { imageBuilder: customImageUrlBuilder }  */ {
      imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, maxWidth, aspectRatio),
    },
  )

  if (!imageProps) return null

  const altTag = image?.isDecorative ? '' : image?.alt || ''

  // This is just a hack to remove the annoying image warning. In theory,
  // this shouldn't actually effect the image from Sanity and it satisfies Next
  imageProps.src = imageProps.src + `&width=1000`

  // https://github.com/bundlesandbatches/next-sanity-image#fill-layout
  if (layout === 'fill') {
    return (
      <Img
        src={imageProps.src}
        alt={altTag}
        sizes={sizes}
        layout={layout}
        placeholder={placeholder}
        objectFit={objectFit}
      />
    )
  }

  return (
    <Img
      {...rest}
      {...imageProps}
      alt={altTag}
      sizes={sizes}
      layout={layout}
      role={image?.isDecorative ? 'presentation' : undefined}
      placeholder={placeholder}
      unoptimized={unoptimized}
    />
  )
}

export default Image
