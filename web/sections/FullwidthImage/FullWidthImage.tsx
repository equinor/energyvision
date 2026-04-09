'use client'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { type Figure, Image, type ImageRatioKeys } from '../../core/Image/Image'
import type { DesignOptions } from '../../types/index'

export type FullWidthImageData = {
  type: string
  id: string
  image: Figure
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
    <section className='w-full justify-center'>
      <Image
        id={anchor}
        image={image}
        grid='full'
        aspectRatio={aspectRatio}
        className='max-w-[1800px]'
      />
      {image.asset && (caption || attribution) && (
        <div className='mx-auto max-w-viewport px-layout-sm'>
          <FigureCaption
            className={'mt-2 pt-0 pb-8'}
            caption={caption}
            attribution={attribution}
          />
        </div>
      )}
    </section>
  )
}

export default FullWidthImage
