import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { resolveImage } from '@/sanity/lib/utils'

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
  '4:3': 1.33,
  '4:5': 0.8,
  '5:4': 1.25,
  '5:3': 1.66,
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
    case 'lg':
    default:
      return isLargerDisplays ? getPxLgSizes() : getPxLgSizes()
  }
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
  /** overrides for the next image */
  imageClassName?: string
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
  useFitMin = false,
}: ImageProps) => {
  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

  if (!image?.asset) return <></>

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
      sizes={getSizes(grid, isLargerDisplays)}
      alt={getAltText()}
      className={twMerge(
        `${fill ? 'object-cover' : 'flex h-auto w-full'}`,
        imageClassName,
      )}
    />
  ) : null

  return <div className={twMerge(`relative`, className)}>{nextImage}</div>
}
