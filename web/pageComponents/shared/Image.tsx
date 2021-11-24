import Img from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { SanityImgLoader } from '../../common/helpers'
import { sanityClient } from '../../lib/sanity.server'
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

  ...rest
}: ImgProps) => {
  const imageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, maxWidth, aspectRatio),
  })

  if (!imageProps) return null

  const altTag = image?.isDecorative ? '' : image?.alt || ''

  // https://github.com/bundlesandbatches/next-sanity-image#fill-layout
  if (layout === 'fill') {
    return <Img src={imageProps.src} alt={altTag} sizes={sizes} layout={layout} placeholder={placeholder} />
  }

  return (
    <Img
      {...rest}
      {...imageProps}
      alt={altTag}
      sizes={sizes}
      layout={layout}
      placeholder={placeholder}
      unoptimized={unoptimized}
    />
  )
}

export default Image
