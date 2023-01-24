import styled from 'styled-components'
import Image from '../Image'
import { Ratios } from '../SanityImage'
import { Caption } from '../image/Caption'
import type { ImageWithAlt } from '../../../types/types'

const StyledFigure = styled.figure`
  margin: 0;
`

const CaptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  grid-gap: var(--space-large);
  padding: var(--space-medium);
`

const StyledCaption = styled(Caption)`
  max-width: 100%;
`

const PaginationContainer = styled.div.attrs({ className: 'paginationWrapper' })`
  text-align: center;
  margin-top: var(--space-small);
  font-size: var(--typeScale-0);
`

type CarouselItemProps = {
  image: ImageWithAlt
  caption?: string
  attribution?: string
}

export const CarouselItem = ({ image, caption, attribution }: CarouselItemProps) => {
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
      <CaptionContainer>
        <StyledCaption caption={caption} attribution={attribution} />
        <PaginationContainer></PaginationContainer>
      </CaptionContainer>
    </StyledFigure>
  )
}
