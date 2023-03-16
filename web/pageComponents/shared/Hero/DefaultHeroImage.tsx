import styled from 'styled-components'
import type { ImageWithCaptionData } from '../../../types/types'
import Image from '../Image'
import { Caption } from '../image/Caption'
import { Ratios } from '../SanityImage'

type HeroImageProps = {
  data: ImageWithCaptionData
}

const StyledFigure = styled.figure`
  margin: 0;
`

const DefaulHeroImage = ({ data }: HeroImageProps) => {
  const { image, caption, attribution } = data
  return (
    <StyledFigure>
      <Image
        maxWidth={1420}
        aspectRatio={Ratios.ONE_TO_TWO}
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
        priority
      />
      <Caption caption={caption} attribution={attribution} />
    </StyledFigure>
  )
}

export default DefaulHeroImage
