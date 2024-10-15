import imageUrlBuilder from '@sanity/image-url'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'
import type { ImageWithAlt } from '../../types/index'

const builder = imageUrlBuilder(sanityClientWithEquinorCDN)

const getOpenGraphImages = (image?: ImageWithAlt) => {
  return image?.asset
    ? [
        /*  {
          url: builder.image(image).width(800).height(600).url() || '',
          width: 800,
          height: 600,
          alt: image.alt,
        }, */
        {
          // Facebook and Twitter recommended size
          url: builder.image(image).width(1200).height(630).url() || '',
          width: 1200,
          height: 630,
          alt: image.alt,
        },
        /*    {
          // Square 1:1
          url: builder.image(image).width(600).height(600).url() || '',
          width: 600,
          height: 600,
          alt: image.alt,
        }, */
      ]
    : []
}

export default getOpenGraphImages
