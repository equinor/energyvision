import Img from 'next/image'
import styled from 'styled-components'
import { imageProps } from '../../common/helpers'
import type { ImageWithCaptionData } from '../../types/types'

type HeroImageProps = {
  data: ImageWithCaptionData
}

const StyledFigure = styled.figure`
  margin: 0;
`

const FigCaption = styled.figcaption`
  font-size: var(--typeScale-0);
  margin-top: var(--space-small);
`

const HeroImage = ({ data }: HeroImageProps) => {
  const { image, caption, attribution } = data
  return (
    <StyledFigure>
      <Img
        {...imageProps(image, 1420, 0.5)}
        sizes="
          (max-width: 340px) 295px,
          (max-width: 600px) 490px,
          (max-width: 800px) 630px,
          (max-width: 1050px) 810px,
          (max-width: 1250px) 950px,
          (max-width: 1450px) 1100px,
          (max-width: 1700px) 1270px,
          1420px
        "
        alt={image.alt}
      />
      {caption || attribution ? <FigCaption>{`${caption} ${attribution}`}</FigCaption> : null}
    </StyledFigure>
  )
}

export default HeroImage
