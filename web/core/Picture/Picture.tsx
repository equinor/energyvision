import type { Ref } from 'react'
import { twMerge } from 'tailwind-merge'
import { resolveImage } from '@/sanity/lib/utils'
import { FigureCaption } from '../FigureCaption/FigureCaption'
import { Image } from '../Image/Image'
import {
  type ImageRatioKeys,
  type Image as ImageType,
  mapSanityImageRatio,
} from '../Image/imageUtilities'

type PictureProps = {
  image: ImageType
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
  className?: string
  ref?: Ref<HTMLElement>
}

export const Picture = ({
  image,
  desktopAspectRatio = '10:3',
  mobileAspectRatio = '4:3',
  caption,
  attribution,
  className = '',
  figureClassName = '',
  figCaptionClassName = '',
  withLayoutPx = true,
  ref,
}: PictureProps) => {
  const { url: desktopUrl } = resolveImage({
    image,
    grid: 'full',
    aspectRatio: mapSanityImageRatio(desktopAspectRatio),
    keepRatioOnMobile: true,
    isLargerDisplays: true,
  })

  const pictureElement = (
    <picture ref={ref} className={twMerge(`relative h-full w-full`, className)}>
      <source media='(min-width: 768px)' srcSet={desktopUrl} />
      <Image
        wrapperVariant='none'
        image={image}
        loading='eager'
        fetchPriority='high'
        grid='lg'
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
}
