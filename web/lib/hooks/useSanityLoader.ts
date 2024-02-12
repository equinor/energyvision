import { useNextSanityImage } from 'next-sanity-image'
import type { ImageWithAlt } from 'types'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'

export const useSanityLoader = (image: ImageWithAlt, maxWidth: number, aspectRatio: number | undefined) =>
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
