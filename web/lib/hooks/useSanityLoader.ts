import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import type { ImageWithAlt } from 'types'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'

export const useSanityLoader = (
  image: ImageWithAlt | SanityImageObject,
  maxWidth: number,
  aspectRatio: number | undefined,
): UseNextSanityImageProps =>
  useNextSanityImage(sanityClientWithEquinorCDN, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      const { width: imageWidth, croppedImageDimensions: cropped } = options
      // We do not want to allow gigantic images to exist due to performance
      const width = Math.round(imageWidth || Math.min(maxWidth, cropped.width))
      const height = aspectRatio
        ? Math.round(width * aspectRatio)
        : Math.round(width * (cropped.height / cropped.width))

      return imageUrlBuilder.width(width).height(height).auto('format').quality(100)
    },
  })
