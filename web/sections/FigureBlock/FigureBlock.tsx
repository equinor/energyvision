import { twMerge } from 'tailwind-merge'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { type Figure, Image, type ImageRatioKeys } from '../../core/Image/Image'
import type { DesignOptions } from '../../types/index'

export type FigureData = {
  type: string
  id: string
  figure: Figure
  alignWithText?: boolean
  useContain?: boolean
  designOptions: DesignOptions & {
    aspectRatio: ImageRatioKeys
  }
}

type FigureBlockProps = {
  data: FigureData
  anchor?: string
  className?: string
}

const FigureBlock = ({ data, anchor, className = '' }: FigureBlockProps) => {
  const { figure, alignWithText, useContain, designOptions } = data
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
        {...(useContain && {
          useContain: true,
        })}
      />
      {(caption || attribution) && (
        <FigureCaption
          caption={caption}
          attribution={attribution}
          withLayoutPx={false}
        />
      )}
    </figure>
  )
}

export default FigureBlock
