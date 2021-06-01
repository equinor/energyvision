import Img from 'next/image'
import { imageProps } from '../../common/helpers'
import type { FigureData } from '../../types/types'
import styled from 'styled-components'

type TeaserProps = {
  data: FigureData
}

const StyledFigure = styled.figure`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin: 0 auto;
`

const FigCaption = styled.figcaption`
  font-size: var(--typeScale-0);
  margin-top: var(--space-small);
`

const FullWidthImage = ({ data }: TeaserProps) => {
  const { figure } = data
  const { image, caption, attribution } = figure
  return (
    <StyledFigure>
      <Img
        {...imageProps(image.asset, 920)}
        alt={image.alt}
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
        <FigCaption>
          {caption} {attribution}
        </FigCaption>
      ) : null}
    </StyledFigure>
  )
}

export default FullWidthImage
