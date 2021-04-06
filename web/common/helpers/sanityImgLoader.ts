import { UseNextSanityImageBuilderOptions } from 'next-sanity-image'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

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
      .quality(60)
  }

  return imageUrlBuilder
    .width(options.width || Math.min(options.originalImageDimensions.width, maxWidth))
    .height(getHeightByAspectRatio(options, maxWidth, aspectRatio))
    .auto('format')
    .quality(60)
}
