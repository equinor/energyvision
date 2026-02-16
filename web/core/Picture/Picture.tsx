'use client'
import type { SanityImageObject } from '@sanity/image-url'
import type { ImageProps } from 'next/image'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { resolveImage } from '@/sanity/lib/utils'
import type { ImageWithAlt, ImageWithCaptionData } from '@/types'
import { FigureCaption } from '../FigureCaption/FigureCaption'
import { Image, type ImageRatioKeys, mapSanityImageRatio } from '../Image/Image'

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
  figureClassName?: string
  /** if figure caption should have the default px layouts
   * @default true
   */
  withLayoutPx?: boolean
} & Omit<ImageProps, 'src' | 'alt'>

export const Picture = forwardRef<HTMLElement, PictureProps>(function Picture(
  {
    image,
    desktopAspectRatio = '10:3',
    mobileAspectRatio = '4:3',
    caption,
    attribution,
    className = '',
    figureClassName = '',
    figCaptionClassName = '',
    withLayoutPx = true,
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
    <figure className={figureClassName}>
      {pictureElement}
      <FigureCaption
        withLayoutPx={withLayoutPx}
        className={figCaptionClassName}
        caption={caption}
        attribution={attribution}
      />
    </figure>
  ) : (
    pictureElement
  )
})
