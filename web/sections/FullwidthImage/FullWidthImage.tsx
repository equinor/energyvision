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
    <section
      className='mx-auto w-full max-w-fullwidth justify-center'
      id={anchor}
    >
      <Image
        id={anchor}
        image={image}
        grid='full'
        aspectRatio={aspectRatio}
        className=''
      />
      {image.asset && (caption || attribution) && (
        <div className='mx-auto max-w-content px-layout-sm'>
          <FigureCaption
            className={'mt-2 pt-0 pb-8'}
            caption={caption}
            attribution={attribution}
            withLayoutPx={false}
          />
        </div>
      )}
    </section>
  )
}

export default FullWidthImage
