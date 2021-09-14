import styled from 'styled-components'
import { FigureCaption } from '@components'
import type { ImageWithCaptionData } from '../../types/types'
import Image from './Image'

type HeroImageProps = {
  data: ImageWithCaptionData
}

const StyledFigure = styled.figure`
  margin: 0;
`

const HeroImage = ({ data }: HeroImageProps) => {
  const { image, caption, attribution } = data
  if (!image) return null
  return (
    <StyledFigure>
      <Image
        maxWidth={1420}
        aspectRatio={0.5}
        image={image}
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
        layout="responsive"
      />
      {caption || attribution ? (
        <FigureCaption>
          {caption && caption} {attribution && attribution}
        </FigureCaption>
      ) : null}
    </StyledFigure>
  )
}

export default HeroImage
