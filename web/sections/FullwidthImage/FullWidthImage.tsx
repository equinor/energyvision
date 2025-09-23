'use client'
import type { DesignOptions, ImageWithCaptionData } from '../../types/index'
import Image, { getFullScreenSizes, ImageRatioKeys } from '../../core/SanityImage/SanityImage'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio: ImageRatioKeys
  }
}

type FullWidthImageProps = {
  data: FullWidthImageData
  anchor?: string
}

const FullWidthImage = ({ data, anchor }: FullWidthImageProps) => {
  const { image, attribution, caption } = data.image
  const { aspectRatio = '16:9' } = data.designOptions

  if (!image) return null

  return (
    <section className="flex w-full justify-center">
      <Image
        id={anchor}
        image={image}
        sizes={getFullScreenSizes()}
        maxWidth={2000}
        aspectRatio={aspectRatio}
        alt={image.alt}
        className="max-w-[1800px]"
      />
      {image.asset && (caption || attribution) && (
        <FigureCaption className={'mx-auto px-layout-sm pt-0 pb-8'}>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </section>
  )
}

export default FullWidthImage
