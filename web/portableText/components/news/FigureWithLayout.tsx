import type { PortableTextBlock } from '@portabletext/types'
//Add to packagejson later after upgrade
//import Zoom from 'react-medium-image-zoom'
import { twMerge } from 'tailwind-merge'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { Image } from '@/core/Image/Image'
import type {
  GridType,
  ImageRatioKeys,
  Image as ImageType,
} from '@/core/Image/imageUtilities'

type LayoutAlignment = 'full' | 'left' | 'right' | 'center'

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageType
  layout: LayoutAlignment
  //Hold until upgrade is done
  //enableImageZoom?: boolean
  imageOrientation?: 'portrait' | 'landscape' | 'square'
  centerImageLayout?: 'left' | 'right'
  centerCaptionAlignment?: 'top' | 'center' | 'bottom'
}

type BlockProps = {
  isInline: boolean
  value: FigureNode
} & PortableTextBlock

export const FigureWithLayout = (block: BlockProps) => {
  const { value } = block
  const {
    image,
    caption,
    attribution,
    layout = 'full',
    //enableImageZoom = false,
    imageOrientation = 'landscape',
    centerImageLayout = 'left',
    centerCaptionAlignment = 'bottom',
  } = value

  if (!image) return null

  let imageRatio = '21:9' as ImageRatioKeys
  if (imageOrientation === 'square') {
    imageRatio = '1:1'
  }
  if (imageOrientation === 'landscape' && layout !== 'full') {
    imageRatio = '3:2'
  }
  if (imageOrientation === 'portrait') {
    imageRatio = 'original'
  }

  const layoutAlignmentClassName = {
    full: 'lg:ps-layout-md lg:pe-layout-md',
    right: `lg:pe-layout-md md:float-end md:ps-6`,
    left: `lg:ps-layout-md md:float-start md:pe-6`,
    //aligned with text
    center: `w-full lg:ps-layout-lg lg:pe-layout-lg items-start md:gap-4`,
  }
  let imageGrid = 'xs' as GridType
  if (layout === 'full') {
    imageGrid = 'md'
  }
  if (layout === 'center') {
    imageGrid = 'lg'
  }

  const figureClassName = twMerge(
    `ps-layout-sm pe-layout-sm my-12`,
    imageOrientation !== 'portrait' && layoutAlignmentClassName[layout],
    imageOrientation === 'portrait' &&
      centerImageLayout === 'left' &&
      'gap-6 md:grid md:grid-cols-[48%_35%] lg:ps-layout-lg lg:pe-layout-lg',
    imageOrientation === 'portrait' &&
      centerImageLayout === 'right' &&
      'gap-6 md:grid md:grid-cols-[35%_48%] lg:ps-layout-lg lg:pe-layout-lg',
  )
  const centerImageCaptionClassName = {
    top: 'flex h-full items-start',
    center: 'flex h-full items-center',
    bottom: 'flex h-full items-end',
  }

  const imageElement = (
    <Image
      image={image}
      grid={imageGrid}
      aspectRatio={imageRatio}
      {...(imageOrientation === 'portrait' && {
        keepRatioOnMobile: true,
        useFitMax: true,
      })}
    />
  )

  const captionElement = (caption || attribution) && (
    <FigureCaption
      className={centerImageCaptionClassName[centerCaptionAlignment]}
      caption={caption}
      attribution={attribution}
      withLayoutPx={false}
    />
  )

  return (
    <figure className={figureClassName}>
      {imageOrientation === 'portrait' &&
        centerImageLayout === 'right' &&
        captionElement}
      {imageElement}
      {(imageOrientation !== 'portrait' ||
        (imageOrientation === 'portrait' && centerImageLayout !== 'right')) &&
        captionElement}
    </figure>
  )
}
