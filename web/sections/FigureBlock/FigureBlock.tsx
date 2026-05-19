import { twMerge } from 'tailwind-merge'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { getLayoutPx } from '@/lib/helpers/getCommonUtilities'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { Image } from '../../core/Image/Image'
import type { Figure, ImageRatioKeys } from '../../core/Image/imageUtilities'
import type { DesignOptions, LayoutGrid } from '../../types/index'

export type FigureData = {
  type: string
  id: string
  figure: Figure
  alignWithText?: boolean
  useContain?: boolean
  layoutGrid?: LayoutGrid
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
  const {
    figure,
    alignWithText,
    useContain,
    layoutGrid = 'lg',
    designOptions,
  } = data
  const { aspectRatio = '16:9' } = designOptions

  const useFitMax = aspectRatio.trim() === '2:3' || aspectRatio.trim() === '1:1'
  if (!figure?.image) return null
  const { image, caption, attribution } = figure
  const { bg, dark } = getBgAndDarkFromBackground(designOptions)
  const px = getLayoutPx(layoutGrid)

  return (
    <figure
      id={anchor}
      className={twMerge(`${bg} ${dark ? 'dark' : ''} `, className)}
    >
      <div className={`mx-auto max-w-content`}>
        <div className={twMerge(``, px)}>
          <Image
            image={image}
            aspectRatio={aspectRatio}
            grid={layoutGrid}
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
        </div>
      </div>
    </figure>
  )
}

export default FigureBlock
