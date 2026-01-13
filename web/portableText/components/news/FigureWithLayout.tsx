import type { PortableTextBlock } from '@portabletext/types'
import Zoom from 'react-medium-image-zoom'
import { twMerge } from 'tailwind-merge'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { type GridType, Image, type ImageRatioKeys } from '@/core/Image/Image'
import type { ImageWithAlt } from '../../../types/index'

type Layout = 'full' | 'left' | 'right' | 'center'

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
  layout: Layout
  enableImageZoom?: boolean
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
    enableImageZoom = false,
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

  const layoutVariantClassName = {
    full: 'lg:ps-layout-md lg:pe-layout-md',
    //md:ps-8
    right: `${imageOrientation !== 'landscape' ? 'lg:w-[38vw]' : 'lg:w-[46vw]'} lg:pe-layout-md lg:float-end lg:ps-6`,
    left: `${imageOrientation !== 'landscape' ? 'lg:w-[38vw]' : 'lg:w-[46vw]'} lg:ps-layout-md lg:float-start lg:pe-6`,
    center: `w-full lg:ps-layout-lg lg:pe-layout-lg lg:grid ${centerImageLayout === 'left' ? 'lg:grid-cols-[auto_45%]' : 'lg:grid-cols-[45%_auto]'} items-start lg:gap-4`,
  }
  let imageGrid = 'xs' as GridType
  if (layout === 'full') {
    imageGrid = 'md'
  }
  if (enableImageZoom) {
    imageGrid = 'sm'
  }

  const figureClassName = twMerge(
    `ps-layout-sm pe-layout-sm ${layoutVariantClassName[layout]} ${layout === 'center' ? `${centerImageLayout === 'right' ? '' : ''}` : ''} my-6`,
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
      hasImageZoom={enableImageZoom}
      {...(imageOrientation === 'portrait' && {
        keepRatioOnMobile: true,
        useFitMax: true,
      })}
    />
  )
  const imageWrapperElement = enableImageZoom ? (
    <Zoom zoomMargin={25}>{imageElement}</Zoom>
  ) : (
    imageElement
  )

  const captionElement = (caption || attribution) && (
    <FigureCaption
      className={centerImageCaptionClassName[centerCaptionAlignment]}
    >
      <div>
        {caption && <div>{caption}</div>}
        {attribution && <div>{attribution}</div>}
      </div>
    </FigureCaption>
  )
  console.log('value', value)

  console.log('centerImageLayout', centerImageLayout)
  console.log('layout', layout)
  console.log('centerCaptionAlignment', centerCaptionAlignment)

  return (
    <figure className={figureClassName}>
      {layout === 'center' && centerImageLayout === 'right' && captionElement}
      {imageWrapperElement}
      {(layout !== 'center' ||
        (layout === 'center' && centerImageLayout !== 'right')) &&
        captionElement}
    </figure>
  )
}
