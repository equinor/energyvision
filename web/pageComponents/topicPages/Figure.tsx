import type { DesignOptions, ImageWithCaptionData } from '../../types/index'
import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import Image, { ImageRatioKeys } from '../../core/SanityImage/SanityImage'
import envisTwMerge from '../../twMerge'
import getBgClassName from '../../common/helpers/getBackgroundColor'

export type FigureData = {
  type: string
  id: string
  figure: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio: ImageRatioKeys
  }
}

type FigureProps = {
  data: FigureData
  anchor?: string
  className?: string
}

const Figure = ({ data, anchor, className = '' }: FigureProps) => {
  const { figure, designOptions } = data
  const { aspectRatio = '16:9' } = designOptions
  //Portrait or square format
  const useFitMin = aspectRatio.trim() === '2:3' || aspectRatio.trim() === '1:1'
  // With previews in Sanity, we need to support work in progress figures
  if (!figure?.image) return null
  const { image, caption, attribution } = figure

  return (
    <figure
      id={anchor}
      className={envisTwMerge(
        `${getBgClassName(designOptions.background.backgroundUtility)} px-layout-lg mx-auto max-w-viewport `,
        className,
      )}
    >
      <Image
        image={image}
        {...(aspectRatio && {
          aspectRatio,
        })}
        className={`${useFitMin ? 'h-full w-auto' : ''}`}
        maxWidth={useFitMin ? 920 : 1920}
        {...(useFitMin && {
          maxHeight: 800,
          useFitMin: true,
        })}
      />
      {(caption || attribution) && (
        <FigureCaption>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  )
}

export default Figure
