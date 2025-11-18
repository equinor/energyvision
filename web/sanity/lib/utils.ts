import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity'
import { getImageDimensions } from '@sanity/asset-utils'
import { GridType } from '@/core/Image/Image'
import { sanityClientWithEquinorCDN } from './equinorCdnClient'

const imageBuilder = createImageUrlBuilder(sanityClientWithEquinorCDN)

const getMaxWidth = (paddingGrid?: GridType, isLargerDisplays = false) => {
  switch (paddingGrid) {
    case 'sm':
      return isLargerDisplays ? 2560 : 800
    case 'md':
      return isLargerDisplays ? 1420 : 800
    case 'xs':
      return isLargerDisplays ? 570 : 800
    case 'full':
      return isLargerDisplays ? 2560 : 800
    case 'lg':
    default:
      return isLargerDisplays ? 1100 : 800
  }
}

/** Should only be used directly if not resolveImage can be used */
export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }
  console.log('source', source)
  const imageRef = source?.asset?._ref
  const crop = source.crop
  // get the image's og dimensions
  const { width, height } = getImageDimensions(imageRef)

  if (crop) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(width * (1 - (crop.right + crop.left)))
    const croppedHeight = Math.floor(height * (1 - (crop.top + crop.bottom)))

    // compute the cropped image's position
    const left = Math.floor(width * crop.left)
    const top = Math.floor(height * crop.top)

    // gather into a url
    return imageBuilder?.image(source).rect(left, top, croppedWidth, croppedHeight).auto('format')
  }

  return imageBuilder?.image(source).auto('format')
}

export type ResolveImageProps = {
  image: any
  isLargerDisplays?: boolean
  /** Which grid column the image is contained within on larger displays. Sm on mobile
   * @default lg
   */
  grid?: GridType
  /** Aspect ratio for larger displays, 4:3 on mobile
   * @default 16:9
   */
  aspectRatio?: number
  useFitMin?: boolean
  /* Custom width */
  customWidth?: number | undefined
  /* Custom height */
  customHeight?: number | undefined
}
/**
 * Single point of entry to fetch images from Sanity for pages and components,
 * If not using Image component but directly
 * remember to send isLargerDisplay param.
 * Will collect 4:3 images for mobile and ssr
 */
export const resolveImage = (props: ResolveImageProps) => {
  const {
    image,
    aspectRatio = 1.77,
    useFitMin,
    customWidth,
    customHeight,
    grid = 'lg',
    isLargerDisplays = false,
  } = props

  // 4:3 for mobile images and serverside. Default 16:9 on larger
  const ratio = isLargerDisplays ? aspectRatio : 1.33

  const { width: imageWidth, height: imageHeight } = getImageDimensions(image)

  let width = customWidth ? customWidth : Math.round(Math.min(imageWidth, getMaxWidth(grid, isLargerDisplays)))
  let height = Math.round(width / ratio)

  // If portrait and one wants to control height and keep aspect
  if (customHeight && imageHeight > customHeight) {
    height = customHeight
    width = Math.round(aspectRatio * customHeight)
  }
  let url = null
  if (useFitMin) {
    url = urlForImage(image)?.width(width).height(height).fit('min')
  }
  url = urlForImage(image)?.width(width).height(height).fit('crop').url()

  return { url, width, height }
}
export type OGImage =
  | {
      url: string
      alt: string
      width: number
      height: number
    }
  | undefined

export function resolveOpenGraphImage(image: any, width = 1200, height = 627): OGImage {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return { url, alt: image?.alt as string, width, height }
}
type DataAttributeConfig = CreateDataAttributeProps & Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
