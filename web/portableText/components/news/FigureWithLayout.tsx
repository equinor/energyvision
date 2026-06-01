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
  landscapeRatio?: Extract<ImageRatioKeys, '21:9' | 'original' | '16:9'>
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
    layout = 'left',
    //enableImageZoom = false,
    imageOrientation = 'landscape',
    centerImageLayout = 'left',
    centerCaptionAlignment = 'bottom',
    landscapeRatio = '16:9',
  } = value

  if (!image) return null

  let imageRatio = '16:9' as ImageRatioKeys
  if (imageOrientation === 'square') {
    imageRatio = '1:1'
  }
  if (imageOrientation === 'landscape') {
    if (layout === 'center') {
      imageRatio = landscapeRatio
    } else if (layout === 'full') {
      imageRatio = '16:9'
    } else {
      imageRatio = '4:3'
    }
  }
  if (imageOrientation === 'portrait') {
    imageRatio = 'original'
  }

  const layoutAlignmentClassName = {
    full: 'lg:px-layout-md',
    right: `lg:pe-layout-md md:float-end md:ps-8`,
    left: `lg:ps-layout-md md:float-start md:pe-8`,
    //aligned with text
    center: `w-full lg:px-layout-lg items-start md:gap-4`,
  }
  let imageGrid = 'xs' as GridType
  if (layout === 'full') {
    imageGrid = 'md'
  }
  if (layout === 'center') {
    imageGrid = 'lg'
  }

  const figureClassName = twMerge(
    `px-layout-sm my-12`,
    (layout === 'left' || layout === 'right') && 'md:w-1/2',
    imageOrientation !== 'portrait' && layoutAlignmentClassName[layout],
    imageOrientation === 'portrait' &&
      centerImageLayout === 'left' &&
      'gap-6 md:grid md:grid-cols-[48%_35%] lg:px-layout-lg',
    imageOrientation === 'portrait' &&
      centerImageLayout === 'right' &&
      'gap-6 md:grid md:grid-cols-[35%_48%] lg:px-layout-lg',
  )
  const centerImageCaptionClassName = {
    top: 'flex flex-col h-full items-start',
    center: 'flex flex-col h-full items-center',
    bottom: 'flex flex-col h-full items-end',
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
      className={twMerge(
        imageOrientation === 'portrait' &&
          centerImageCaptionClassName[centerCaptionAlignment],
      )}
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
