import type { FigureData } from '../../types/types'
import styled from 'styled-components'
import { BackgroundContainer, FigureCaption } from '@components'
import { StyledTextBlockWrapper } from './TextBlock'
import Image from '../shared/Image'

type TeaserProps = {
  data: FigureData
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
*/
const StyledFigureWrapper = styled(BackgroundContainer)`
  ${StyledTextBlockWrapper} + & ${StyledFigure} {
    padding-top: 0;
  }
`

const FullWidthImage = ({ data }: TeaserProps) => {
  const { figure, designOptions } = data

  // With previews in Sanity, we need to support work in progress figures
  if (!figure?.image) return null

  const { image, caption, attribution } = figure

  return (
    <StyledFigureWrapper background={designOptions?.background}>
      <StyledFigure>
        <Image
          image={image}
          maxWidth={920}
          sizes="
          (max-width: 360px) 313px,
          (max-width: 600px) 415px,
          (max-width: 950px) 550px,
          (max-width: 1250px) 655px,
          (max-width: 1450px) 730px,
          (max-width: 1700px) 825px,
          920px
          "
          layout="responsive"
        />
        {caption || attribution ? (
          <FigureCaption>
            {caption} {attribution}
          </FigureCaption>
        ) : null}
      </StyledFigure>
    </StyledFigureWrapper>
  )
}

export default FullWidthImage
