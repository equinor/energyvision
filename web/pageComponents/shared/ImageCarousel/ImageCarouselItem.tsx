import styled from 'styled-components'
import Image, { Ratios } from '../SanityImage'
import { Caption } from '../image/Caption'
import { EdsProvider } from '@equinor/eds-core-react'
import { NavButton } from './Navigation'
import type { ImageWithAlt } from '../../../types/index'

const StyledFigure = styled.figure`
  margin: 0;
`

const CaptionContainer = styled.div`
  display: grid;
  grid-gap: var(--space-small);
  padding: var(--space-medium);
  grid-template-areas:
    'controls'
    'caption';

  @media (min-width: 800px) {
    grid-template-columns: 1fr auto;
    grid-template-areas: 'caption controls';
    grid-gap: var(--space-large);
  }
`

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: min-content;
  grid-area: controls;
`

const StyledCaption = styled(Caption)`
  max-width: 100%;
  grid-area: caption;
`

const PaginationContainer = styled.div.attrs({ className: 'paginationWrapper' })`
  text-align: center;
  padding: 0 var(--space-medium);
  font-size: var(--typeScale-0);
`

type CarouselItemProps = {
  image: ImageWithAlt
  pagination: string
  caption?: string
  attribution?: string
}

export const CarouselItem = ({ image, pagination, caption, attribution }: CarouselItemProps) => {
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
        priority
      />
      <CaptionContainer>
        <StyledCaption caption={caption} attribution={attribution} />
        <NavContainer>
          <EdsProvider density="compact">
            <NavButton type="prev" />
            <PaginationContainer>{pagination}</PaginationContainer>
            <NavButton type="next" />
          </EdsProvider>
        </NavContainer>
      </CaptionContainer>
    </StyledFigure>
  )
}
