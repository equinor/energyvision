import type { FigureData } from '../../types/types'
import styled from 'styled-components'
import { BackgroundContainer, FigureCaption } from '@components'
import { StyledTextBlockWrapper } from './TextBlock'
import Image, { Ratios } from '../shared/SanityImage'

type TeaserProps = {
  data: FigureData
  anchor?: string
}

const StyledFigure = styled.figure`
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
`

/* If the image is an adjacent sibling of a text block component, we don't want
to double up the padding (with text block bottom and image top padding)
This is not an optimal solution, but we still don't know how many components
that will act like this, and/or if the image should be a part of the text block component instead
Update: Let's see if it works by removing half of the top padding for background container
with an adjacent child of same colour instead
*/
const StyledFigureWrapper = styled(BackgroundContainer)`
  /*   ${StyledTextBlockWrapper} + & ${StyledFigure} {
    padding-top: 0;
  } */
`

const FullWidthImage = ({ data, anchor }: TeaserProps) => {
  const { figure, designOptions } = data

  // With previews in Sanity, we need to support work in progress figures
  if (!figure?.image) return null

  const { image, caption, attribution } = figure
  const { aspectRatio } = designOptions
  // If we add more ratios, create a switch statement for the sanity ratios, for now we only have 9:16
  const sizes = '(min-width: 2060px) 920px, (min-width: 440px) calc(34.56vw + 215px), calc(76.67vw + 38px)'

  return (
    <StyledFigureWrapper background={designOptions?.background} id={anchor}>
      <StyledFigure>
        {aspectRatio !== 'original' ? (
          <Image image={image} aspectRatio={Ratios.NINE_TO_SIXTEEN} maxWidth={920} sizes={sizes} />
        ) : (
          <Image image={image} maxWidth={920} sizes={sizes} />
        )}

        {(caption || attribution) && (
          <FigureCaption>
            {caption && <FigureCaption.Caption>{caption}</FigureCaption.Caption>}
            {attribution && <FigureCaption.Attribution>{attribution}</FigureCaption.Attribution>}
          </FigureCaption>
        )}
      </StyledFigure>
    </StyledFigureWrapper>
  )
}

export default FullWidthImage
