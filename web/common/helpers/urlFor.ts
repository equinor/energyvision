import imageUrlBuilder from '@sanity/image-url'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import { sanityClientWithEquinorCDN } from '@/sanity/lib/client'

const builder = imageUrlBuilder(sanityClientWithEquinorCDN)

export const urlFor = (source: SanityImageObject): ImageUrlBuilder => {
  return builder.image(source)
}
