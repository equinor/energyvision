import { twMerge } from 'tailwind-merge'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { Image, type ImageRatioKeys } from '../../core/Image/Image'
import type { DesignOptions, ImageWithCaptionData } from '../../types/index'

export type FigureData = {
  type: string
  id: string
  figure: ImageWithCaptionData
  alignWithText?: boolean
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
  const { figure, alignWithText, designOptions } = data
  const { aspectRatio = '16:9' } = designOptions

  const useFitMax = aspectRatio.trim() === '2:3' || aspectRatio.trim() === '1:1'
  if (!figure?.image) return null
  const { image, caption, attribution } = figure
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  return (
    <figure
      id={anchor}
      className={twMerge(
        `relative ${bg} ${dark ? 'dark' : ''} px-layout-sm lg:px-layout-lg`,
        className,
      )}
    >
      <Image
        image={image}
        aspectRatio={aspectRatio}
        grid='lg'
        className={`${alignWithText ? 'max-w-envis-text' : ''}`}
        {...(useFitMax && {
          useFitMax: true,
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
