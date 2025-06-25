import type { FigureData } from '../../types/index'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { BackgroundContainer } from '@/core/Backgrounds'
import Image, { Ratios } from '../shared/SanityImage'

type FigureProps = {
  data: FigureData
  anchor?: string
  className?: string
}

const Figure = ({ data, anchor, className }: FigureProps) => {
  const { figure, designOptions } = data

  // With previews in Sanity, we need to support work in progress figures
  if (!figure?.image) return null

  const { image, caption, attribution } = figure

  return (
    <BackgroundContainer
      background={designOptions?.background}
      id={anchor}
      className={className}
      as="figure"
      renderFragmentWhenPossible
    >
      {designOptions.aspectRatio === '16:9' ? (
        <Image
          image={image}
          aspectRatio={Ratios.NINE_TO_SIXTEEN}
          maxWidth={920}
          sizes={'(min-width: 2060px) 920px, (min-width: 440px) calc(34.56vw + 215px), calc(76.67vw + 38px)'}
          className={`aspect-video`}
        />
      ) : (
        <Image
          image={image}
          maxWidth={920}
          sizes={'(min-width: 2060px) 920px, (min-width: 440px) calc(34.56vw + 215px), calc(76.67vw + 38px)'}
        />
      )}

      {(caption || attribution) && (
        <FigureCaption>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </BackgroundContainer>
  )
}

export default Figure
