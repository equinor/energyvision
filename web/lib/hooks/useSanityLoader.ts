import { useNextSanityImage } from 'next-sanity-image'
import type { ImageWithAlt } from 'types'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'
import { useState, useEffect } from 'react'

export const useSanityLoader = (image: ImageWithAlt, maxWidth: number, aspectRatio: number | undefined) => {
  const [devicePixelRatio, setDevicePixelRatio] = useState(1)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access the device pixel ratio when the component mounts
      const ratio = window.devicePixelRatio
      setDevicePixelRatio(ratio)
    }
  }, [])

  return useNextSanityImage(sanityClientWithEquinorCDN, image, {
    imageBuilder: (imageUrlBuilder, options) => {
      const { width: imageWidth, croppedImageDimensions: cropped } = options
      // We do not want to allow gigantic images to exist due to performance
      const width = Math.round(imageWidth || Math.min(maxWidth, cropped.width))
      const height = aspectRatio
        ? Math.round(width * aspectRatio)
        : Math.round(width * (cropped.height / cropped.width))

      return imageUrlBuilder.width(width).height(height).auto('format').quality(70).dpr(devicePixelRatio)
    },
  })
}
