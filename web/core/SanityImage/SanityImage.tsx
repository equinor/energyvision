import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import Img, { ImageProps } from 'next/image'
import type { ImageWithAlt } from 'types'
import envisTwMerge from '../../twMerge'

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
export type ImageRatioValues = typeof ImageRatios[ImageRatioKeys]

export const mapSanityImageRatio = (ratio: ImageRatioKeys) => {
  return ImageRatios[ratio]
}

export const getTwAspectRatioUtilityOnRatio = (ratio: ImageRatioKeys) => {
  return {
    original: '',
    '1:1': 'aspect-square',
    '3:10': 'aspect-[3/10]',
    '10:3': 'aspect-[10/3]',
    '19:40': 'aspect-[19/40]',
    '1:2': 'aspect-[1/2]',
    '2:1': 'aspect-[2/1]',
    '2:3': 'aspect-[2/3]',
    '16:9': 'aspect-video',
    '9:16': 'aspect-[9/16]',
    '3:4': 'aspect-[3/4]',
    '3:2': 'aspect-[3/2]',
    '4:3': 'aspect-[4/3]',
    '4:5': 'aspect-[4/5]',
    '5:4': 'aspect-[5/4]',
    '5:3': 'aspect-[5/3]',
    '21:9': 'aspect-[21/9]',
  }[ratio]
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

const DEFAULT_MAX_WIDTH = 2560

type Props = Omit<ImageProps, 'src' | 'alt' | 'sizes'> & {
  image: ImageWithAlt | SanityImageObject
  /** Max width
   * @default 2560
   */
  maxWidth?: number
  maxHeight?: number | undefined
  /** Aspect ratio
   * @default 16:9
   */
  aspectRatio?: ImageRatioKeys
  alt?: string
  useFitMin?: boolean
  /** Responsive image sizes
   * @default getPxLgSizes
   */
  sizes?: string | undefined
}

const Image = ({
  image,
  aspectRatio,
  sizes = getPxLgSizes(),
  maxWidth = DEFAULT_MAX_WIDTH,
  maxHeight,
  fill,
  className = '',
  useFitMin = false,
  ...rest
}: Props) => {
  const imageProps = useSanityLoader(image, maxWidth, mapSanityImageRatio(aspectRatio ?? '16:9'), useFitMin, maxHeight)

  if (!image?.asset) return <></>
  const { width, height, src } = imageProps

  const props = fill ? { fill } : { width, height }

  const getAltText = () => {
    if ('alt' in image && image.alt) {
      return image.alt
    }
    return ''
  }

  return (
    <Img
      {...rest}
      {...props}
      src={src}
      alt={getAltText()}
      sizes={sizes}
      className={envisTwMerge(`${fill ? 'object-cover' : 'flex w-full h-auto'}`, className)}
    />
  )
}

export default Image
