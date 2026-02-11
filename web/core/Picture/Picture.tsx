import type { SanityImageObject } from '@sanity/image-url'
import { getImageProps, type ImageProps } from 'next/image'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { resolveImage } from '@/sanity/lib/utils'
import type { ImageWithAlt, ImageWithCaptionData } from '@/types'
import { FigureCaption } from '../FigureCaption/FigureCaption'
import {
  getFullScreenSizes,
  Image,
  type ImageRatioKeys,
  mapSanityImageRatio,
} from '../Image/Image'
import { Typography } from '../Typography'

type PictureProps = {
  image: ImageWithAlt | ImageWithCaptionData | SanityImageObject
  caption?: string
  attribution?: string
  /** Aspect ratio for desktop. Should either be 10:3, 21:9
   * @default 10:3
   */
  desktopAspectRatio?: ImageRatioKeys
  /** Aspect ratio for mobile, should be 4/3
   * @default 4:3
   */
  mobileAspectRatio?: ImageRatioKeys
  figCaptionClassName?: string
} & Omit<ImageProps, 'src' | 'alt'>

export const Picture = forwardRef<HTMLElement, PictureProps>(function Picture(
  {
    image,
    desktopAspectRatio = '10:3',
    mobileAspectRatio = '4:3',
    caption,
    attribution,
    className = '',
    figCaptionClassName = '',
  },
  ref,
) {
  const {
    url: desktopUrl,
    width,
    height,
  } = resolveImage({
    image,
    grid: 'full',
    aspectRatio: mapSanityImageRatio(desktopAspectRatio),
    keepRatioOnMobile: true,
    isLargerDisplays: true,
  })
  console.log('desktopUrl', desktopUrl)

  // Get props for the desktop image source
  /*     const {
      props: { srcSet: desktopSrcSet },
    } = getImageProps({
      alt: 'alt' in image && image.alt ? image.alt : '',
      width,
      height,
      src: desktopUrl as string,
    }) */

  const pictureElement = (
    <picture ref={ref} className={twMerge(`relative h-full w-full`, className)}>
      <source media='(min-width: 768px)' srcSet={desktopUrl} />
      <Image
        wrapperVariant='none'
        image={image}
        loading='eager'
        fetchPriority='high'
        grid='xs'
        aspectRatio={mobileAspectRatio}
        keepRatioOnMobile
      />
    </picture>
  )

  return caption || attribution ? (
    <figure>
      {pictureElement}
      <FigureCaption
        withLayoutPx
        className={figCaptionClassName}
        caption={caption}
        attribution={attribution}
      />
    </figure>
  ) : (
    pictureElement
  )
})
