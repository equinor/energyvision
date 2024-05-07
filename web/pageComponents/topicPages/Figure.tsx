import type { FigureData } from '../../types/types'
import { BackgroundContainer, FigureCaption } from '@components'
import Image, { Ratios } from '../shared/SanityImage'

type TeaserProps = {
  data: FigureData
  anchor?: string
  className?: string
}

const FullWidthImage = ({ data, anchor, className }: TeaserProps) => {
  const { figure, designOptions } = data

  // With previews in Sanity, we need to support work in progress figures
  if (!figure?.image) return null

  const { image, caption, attribution } = figure

  return (
    <BackgroundContainer
      background={designOptions?.background}
      id={anchor}
      className={className}
      renderFragmentWhenPossible
    >
      <figure className="pb-page-content px-layout-lg max-w-viewport mx-auto">
        {designOptions.aspectRatio === '9:16' ? (
          <Image
            image={image}
            aspectRatio={Ratios.NINE_TO_SIXTEEN}
            maxWidth={920}
            sizes={'(min-width: 2060px) 920px, (min-width: 440px) calc(34.56vw + 215px), calc(76.67vw + 38px)'}
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
            {caption && <FigureCaption.Caption>{caption}</FigureCaption.Caption>}
            {attribution && <FigureCaption.Attribution>{attribution}</FigureCaption.Attribution>}
          </FigureCaption>
        )}
      </figure>
    </BackgroundContainer>
  )
}

export default FullWidthImage
