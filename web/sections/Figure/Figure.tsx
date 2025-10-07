import type { DesignOptions, ImageWithCaptionData } from '../../types/index'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import Image, { getPxLgSizes, ImageRatioKeys } from '../../core/SanityImage/SanityImage'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

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
  console.log('alignWithText', alignWithText)

  const useFitMin = aspectRatio.trim() === '2:3' || aspectRatio.trim() === '1:1'
  if (!figure?.image) return null
  const { image, caption, attribution } = figure
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)

  //${useFitMin ? 'h-full w-auto' : ''}
  return (
    <figure
      id={anchor}
      className={twMerge(`relative ${bg} ${dark ? 'dark' : ''} px-layout-sm lg:px-layout-lg`, className)}
    >
      <Image
        image={image}
        aspectRatio={aspectRatio}
        sizes={getPxLgSizes()}
        className={`${alignWithText ? 'max-w-envis-text' : ''}`}
        maxWidth={alignWithText ? 810 : 1100}
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
