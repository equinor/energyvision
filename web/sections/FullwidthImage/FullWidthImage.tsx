'use client'
import type { DesignOptions, ImageWithCaptionData } from '../../types/index'
import { Image, ImageRatioKeys } from '../../core/Image/Image'
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
    <section className="w-full justify-center">
      <Image id={anchor} image={image} grid="full" aspectRatio={aspectRatio} className="max-w-[1800px]" />
      {image.asset && (caption || attribution) && (
        <div className='max-w-viewport mx-auto px-layout-sm'>
        <FigureCaption className={' pt-0 mt-2 pb-8'}>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
        </div>
      )}
    </section>
  )
}

export default FullWidthImage
