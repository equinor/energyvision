'use client'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { useMemo } from 'react'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { twMerge } from '@/lib/twMerge/twMerge'
import { resolveImage } from '@/sanity/lib/utils'
import { Typography } from '../Typography'

export const ImageRatios = {
  original: 0,
  '1:1': 1,
  '3:10': 0.3,
  '10:3': 3.33,
  '19:40': 0.475,
  '1:2': 0.5,
  '2:1': 2,
  '2:3': 0.66,
  '16:9': 1.77,
  '9:16': 0.5625,
  '3:4': 0.75,
  '3:2': 1.5,
  '4:3': 1.33,
  '4:5': 0.8,
  '5:4': 1.25,
  '5:3': 1.66,
  '21:9': 2.33,
} as const

export type ImageRatioKeys = keyof typeof ImageRatios
export type ImageRatioValues = (typeof ImageRatios)[ImageRatioKeys]

export const mapSanityImageRatio = (ratio: ImageRatioKeys) => {
  return ImageRatios[ratio]
}

/** Use when image is smaller than px-layout-lg
 * eg the side image on textblock, 50/50 teaser image, promotiles image, card images
 * max width for image size 570px
 */
export const getSmallerThanPxLgSizes = () => {
  return `(max-width: 340px) 295px,
  (max-width: 600px) 451px,
  (max-width: 800px) 560px,
  (max-width: 900px) 290px,
  (max-width: 1250px) 390px,
  (max-width: 1450px) 436px,
  (max-width: 1700px) 503px,
  570px`
}
/** Use when image is size of the main content column
 * px-layout-lg -> ish920px
 * max width for image size 1100px
 */
export const getPxLgSizes = () => {
  return '(max-width: 800px) 100vw,(max-width: 900px) 920px,1100px'
}

/** Use when image is between most outer content column and main content column
 * px-layout-sm or px-layout-md
 * max width for images: 1420px
 */
export const getPxSmSizes = () => {
  return `(max-width: 340px) 295px,
  (max-width: 600px) 490px,
  (max-width: 800px) 630px,
  (max-width: 1050px) 810px,
  (max-width: 1250px) 950px,
  (max-width: 1450px) 1100px,
  (max-width: 1700px) 1270px,
  1420px`
}
/* Choose when image is full screen
 * max width for images: 2560px
 */
export const getFullScreenSizes = () => {
  return `(max-width: 800px) 100vw,
  (max-width: 1280px) 1280px,
  (max-width: 1920px) 1920px,
  2560px`
}

/**
 * full - fullwidth to entire viewport
 * xs - within px-layout-lg but when image is much smaller than the lg container
 */
export type GridType = 'full' | 'sm' | 'md' | 'lg' | 'xs'

const getSizes = (paddingGrid?: GridType, isLargerDisplays = false) => {
  switch (paddingGrid) {
    case 'sm':
      return isLargerDisplays ? getPxSmSizes() : getPxLgSizes()
    case 'md':
      return isLargerDisplays ? getPxSmSizes() : getPxLgSizes()
    case 'xs':
      return isLargerDisplays ? getSmallerThanPxLgSizes() : getPxLgSizes()
    case 'full':
      return isLargerDisplays ? getFullScreenSizes() : getPxLgSizes()
    default:
      return isLargerDisplays ? getPxLgSizes() : getPxLgSizes()
  }
}

export type ObjectPositions =
  | 'center_left'
  | 'center_center'
  | 'center_right'
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'bottom_left'
  | 'bottom_center'
  | 'bottom_right'

export const getObjectPositionForImage = (position: ObjectPositions) => {
  return {
    center_center: 'object-center',
    center_left: 'object-left',
    center_right: 'object-right',
    top_left: 'object-top-left',
    top_center: 'object-top',
    top_right: 'object-top-right',
    bottom_left: 'object-bottom-left',
    bottom_center: 'object-bottom',
    bottom_right: 'object-bottom-right',
  }[position]
}

export const getTwAspectRatioUtilityOnRatio = (ratio: ImageRatioKeys) => {
  return {
    original: '',
    '1:1': 'aspect-square',
    '3:10': 'aspect-3/10',
    '10:3': 'aspect-10/3',
    '19:40': 'aspect-19/40',
    '1:2': 'aspect-1/2',
    '2:1': 'aspect-2/1',
    '2:3': 'aspect-2/3',
    '16:9': 'aspect-video',
    '9:16': 'aspect-9/16',
    '3:4': 'aspect-3/4',
    '3:2': 'aspect-3/2',
    '4:3': 'aspect-4/3',
    '4:5': 'aspect-4/5',
    '5:4': 'aspect-5/4',
    '5:3': 'aspect-5/3',
    '21:9': 'aspect-21/9',
  }[ratio]
}

type ImageProps = Omit<NextImageProps, 'src' | 'alt' | 'sizes'> & {
  image: any
  /** Grid column the image is contained within on larger displays.
   * Determines the sizes param on Next image and width for sanity fetch.
   * Tests for mobile and uses smallest sizes automically
   * @default lg
   * */
  grid?: GridType
  customWidth?: number | undefined
  customHeight?: number | undefined
  /** Aspect ratio for larger displays. 4:3 on mobile
   * @default 16:9
   */
  aspectRatio?: ImageRatioKeys
  alt?: string
  useFitMin?: boolean
  /** overrides for relative wrapper for image */
  className?: string
  /** overrides for the figure container when caption/attribution */
  figureClassName?: string
  /** overrides for image container */
  imageClassName?: string
  caption?: string
  attribution?: string
  /** The complete background color utility to put on figCaption */
  figCaptionBackground?: string
  figCaptionClassName?: string
  keepRatioOnMobile?: boolean
}

//Double check crop and hotspot information comes to sanity fetch image
export const Image = ({
  image,
  grid = 'lg',
  aspectRatio = '16:9',
  customWidth,
  customHeight,
  fill,
  className = '',
  imageClassName = '',
  figureClassName = '',
  useFitMin = false,
  loading,
  caption,
  attribution,
  figCaptionBackground,
  figCaptionClassName = '',
  keepRatioOnMobile = false,
}: ImageProps) => {
  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)
  const twAspectRatioUtility = useMemo(() => {
    if (keepRatioOnMobile) {
      return getTwAspectRatioUtilityOnRatio(aspectRatio)
    }
    return isLargerDisplays
      ? getTwAspectRatioUtilityOnRatio(aspectRatio)
      : 'aspect-4/3'
  }, [isLargerDisplays, aspectRatio, keepRatioOnMobile])

  if (!image?.asset) return null

  const { url, width, height } = resolveImage({
    image,
    grid,
    aspectRatio: mapSanityImageRatio(aspectRatio),
    useFitMin,
    customWidth,
    customHeight,
    isLargerDisplays,
  })

  const getAltText = () => {
    if ('alt' in image && image.alt) {
      return image.alt
    }
    return ''
  }

  const nextImage = url ? (
    <NextImage
      {...(fill
        ? {
            fill: true,
          }
        : { width, height })}
      src={url}
      loading={loading}
      sizes={getSizes(grid, isLargerDisplays)}
      alt={getAltText()}
      className={twMerge(
        `${fill ? 'object-cover' : 'flex h-full w-full'} ${twAspectRatioUtility}`,
        imageClassName,
      )}
    />
  ) : null

  return caption || attribution ? (
    <figure className={twMerge(``, figureClassName)}>
      <div className={twMerge(`relative h-full w-full`, className)}>
        {nextImage}
      </div>
      <figcaption
        className={twMerge(
          `px-layout-sm pt-2 pb-4 text-xs lg:px-layout-lg`,
          figCaptionBackground,
          figCaptionClassName,
        )}
      >
        {(caption || attribution) && (
          <Typography group='plain' variant='div' className='leading-normal'>
            {caption}
            {`${caption && attribution ? ' ' : ''}`}
            {attribution}
          </Typography>
        )}
      </figcaption>
    </figure>
  ) : (
    <div className={twMerge(`relative h-full w-full`, className)}>
      {nextImage}
    </div>
  )
}
