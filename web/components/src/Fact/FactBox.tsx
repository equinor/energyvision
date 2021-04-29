import { forwardRef, Children, isValidElement, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Image } from './Image'
import type { FactImagePosition, FactBackground } from './'

const backgroundVariants: { [name: string]: string } = {
  none: 'var(--ui-background-default)',
  cold: 'var(--ui-background-cold)',
  warm: 'var(--ui-background-warm)',
}

const Wrapper = styled.aside<{background?: FactBackground}>`
  margin: var(--space-4xLarge) 0;
  clear: both;

  ${({ background }) => 
    background && {
     '--background': backgroundVariants[background]}
    }
  }
`

const WrapperWithImg = styled(Wrapper)<{ imagePosition: FactImagePosition }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'image'
    'content';

  @media (min-width: 800px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: min-content;

    ${({ imagePosition }) => 
      imagePosition === 'left' ? {
        gridTemplateAreas: '"image content"'
      } : {
        gridTemplateAreas: '"content image"'
      }
    }
  }
`

export type FactProps = {
  background?: FactBackground
  imagePosition?: FactImagePosition
} & HTMLAttributes<HTMLDivElement>

export const FactBox = forwardRef<HTMLDivElement, FactProps>(function FactBox({ background = 'none', imagePosition = 'left', children }, ref) {
  const hasImage = Children.toArray(children).some((child) => isValidElement(child) && child.type === Image)

  if (hasImage) {
    return (
      <WrapperWithImg imagePosition={imagePosition} background={background} ref={ref}>{children}</WrapperWithImg>
    )
  }

  return (
    <Wrapper background={background} ref={ref}>{children}</Wrapper>
  )
})
