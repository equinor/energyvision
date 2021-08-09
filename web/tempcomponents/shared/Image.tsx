import Img from 'next/image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useNextSanityImage } from 'next-sanity-image'
import { SanityImgLoader } from '../../common/helpers'
import { sanityClient } from '../../lib/sanity.server'

declare const VALID_LAYOUT_VALUES: readonly ['fill', 'fixed', 'intrinsic', 'responsive', undefined]
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number]

type ImgProps = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading' | 'style'
> & {
  image: { _type: 'imageWithAlt'; alt: string; asset: SanityImageObject }
  layout?: LayoutValue
  maxWidth: number
  aspectRatio?: number
}

// Couldn't make it work with ...props due to TypesScript
const Image = ({ image, sizes, layout = 'responsive', maxWidth, aspectRatio, ...rest }: ImgProps) => {
  const imageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, maxWidth, aspectRatio),
  })

  if (!imageProps) return null

  // https://github.com/bundlesandbatches/next-sanity-image#fill-layout
  if (layout === 'fill') {
    return <Img src={imageProps.src} alt={image.alt} sizes={sizes} layout={layout} />
  }

  return <Img {...rest} {...imageProps} alt={image.alt} sizes={sizes} layout={layout} />
}

export default Image
