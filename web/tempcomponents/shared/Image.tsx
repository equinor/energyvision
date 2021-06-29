import Img, { ImageProps } from 'next/image'
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
  //layout?: Pick<ImageProps, 'layout'>
  layout?: LayoutValue
  maxWidth: number
}

// Couldn't make it work with ...props due to TypesScript
const Image = ({ image, sizes, layout = 'responsive', maxWidth }: ImgProps) => {
  const imageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, maxWidth),
  })

  return <Img {...imageProps} alt={image.alt} sizes={sizes} layout={layout} />
}

export default Image
