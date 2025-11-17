import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import type { ImageWithAlt } from '@/types'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { sanityClientWithEquinorCDN } from '../lib/equinorCdnClient'

export const useSanityLoader = (
  image: ImageWithAlt | SanityImageObject,
  maxWidth: number,
  aspectRatio?: number | undefined,
  useFitMin?: boolean,
  maxHeight?: number | undefined,
): UseNextSanityImageProps =>
  useNextSanityImage(sanityClientWithEquinorCDN, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      const { width: imageWidth, croppedImageDimensions: cropped } = options
      // We do not want to allow gigantic images to exist due to performance
      let width = Math.round(Math.min(maxWidth, cropped.width))
      if (imageWidth && imageWidth < maxWidth) {
        width = Math.round(Math.min(imageWidth, maxWidth, cropped.width))
      }
      let height = aspectRatio ? Math.round(width / aspectRatio) : Math.round(width / (cropped.width / cropped.height))

      // If portrait and one wants to control height and keep aspect
      if (maxHeight && height > maxHeight) {
        height = maxHeight
        width = aspectRatio
          ? Math.round(aspectRatio * maxHeight)
          : Math.round((cropped.width / cropped.height) * maxHeight)
      }
      if (useFitMin) {
        return imageUrlBuilder.width(width).height(height).auto('format').fit('min').quality(100)
      }
      return imageUrlBuilder.width(width).height(height).auto('format').quality(100)
    },
  })
