'use client'
import NextImage from 'next/image'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { twMerge } from '@/lib/twMerge/twMerge'
import { resolveImage } from '@/sanity/lib/utils'
import { FigureCaption } from '../FigureCaption/FigureCaption'
import {
  GridType,
  getFullScreenSizes,
  getPxLgSizes,
  getPxSmSizes,
  getSmallerThanPxLgSizes,
  getTwAspectRatioUtilityOnRatio,
  ImageProps,
  mapSanityImageRatio,
} from './imageUtilities'

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

/**
 * Use Image to render <figure> element with caption/attribution or simple <img> element with alt
 *
 * @example
 * <Image image={image} grid="full" aspectRatio="10:3" />
 */
export const Image = ({
  image,
  wrapperVariant = 'simple',
  grid = 'lg',
  aspectRatio = '16:9',
  customWidth,
  customHeight,
  fill,
  className = '',
  imageClassName = '',
  figureClassName = '',
  useFitMax = false,
  useContain = false,
  loading,
  fetchPriority,
  caption,
  attribution,
  figCaptionClassName = '',
  keepRatioOnMobile = false,
  hasImageZoom = false,
}: ImageProps) => {
  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

  if (!image || !image?.asset) return null

  const { url, width, height } = resolveImage({
    image,
    grid,
    aspectRatio: mapSanityImageRatio(aspectRatio),
    useFitMax,
    useContain,
    customWidth,
    customHeight,
    isLargerDisplays,
    keepRatioOnMobile,
  })

  let altText = ''
  if ('alt' in image && image?.alt) {
    altText = image.alt
  }
  const aspectRatioClass = getTwAspectRatioUtilityOnRatio(
    isLargerDisplays ? aspectRatio : '4:3',
  )

  const nextImage = url ? (
    <NextImage
      {...(fill ? { fill: true } : { width, height })}
      src={url}
      loading={loading}
      fetchPriority={fetchPriority}
      sizes={
        hasImageZoom ? getSizes('sm', true) : getSizes(grid, isLargerDisplays)
      }
      alt={altText}
      className={twMerge(
        `${fill ? 'object-cover' : 'flex h-full w-full'}`,
        imageClassName,
      )}
    />
  ) : null

  const imageElement =
    wrapperVariant === 'simple' ? (
      <div
        className={twMerge(
          `relative h-full max-h-full w-full max-w-full`,
          fill && aspectRatioClass,
          className,
        )}
      >
        {nextImage}
      </div>
    ) : (
      nextImage
    )

  return caption || attribution ? (
    <figure className={twMerge(``, figureClassName)}>
      {imageElement}
      <FigureCaption
        className={figCaptionClassName}
        withLayoutPx
        caption={caption}
        attribution={attribution}
      />
    </figure>
  ) : (
    imageElement
  )
}
