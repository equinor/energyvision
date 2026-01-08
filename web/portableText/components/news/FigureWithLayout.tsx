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
    full: 'md:ps-layout-sm md:pe-layout-sm',
    //md:ps-8
    right: `${imageOrientation !== 'landscape' ? 'md:w-[35vw]' : 'md:w-[44vw]'} md:pe-layout-sm md:float-end md:ps-8`,
    left: `${imageOrientation !== 'landscape' ? 'md:w-[35vw]' : 'md:w-[44vw]'} md:ps-layout-sm md:float-start md:pe-8`,
    center: `w-full md:ps-layout-lg md:pe-layout-lg md:grid md:grid-cols-[45%_40%] items-center md:gap-4`,
  }
  let imageGrid = 'xs' as GridType
  if (layout === 'full') {
    imageGrid = 'md'
  }
  if (enableImageZoom) {
    imageGrid = 'sm'
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

  const figureClassName = twMerge(
    `ps-layout-sm pe-layout-sm ${layoutVariantClassName[layout]} my-4`,
  )

  return enableImageZoom ? (
    <figure className={figureClassName}>
      <Zoom zoomMargin={25}>{imageElement}</Zoom>
      {(caption || attribution) && (
        <FigureCaption>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  ) : (
    <figure className={figureClassName}>
      {imageElement}
      {(caption || attribution) && (
        <FigureCaption>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  )
}
