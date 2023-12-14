import { forwardRef, Children, isValidElement, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Image } from './Image'
import type { FactImagePosition } from './'
import { getContainerColor, isInvertedColor } from '@utils'
import { BackgroundColours } from '../../../types/types'

type FactBoxWrapperStyleProps = {
  isInverted?: boolean
  background?: BackgroundColours
}
const FactBoxWrapperStyle = styled.aside.attrs<FactBoxWrapperStyleProps>(({ isInverted }) =>
  isInverted
    ? {
        className: `inverted-background `,
      }
    : {
        className: ``,
      },
)<FactBoxWrapperStyleProps>`
  clear: both;

  ${({ background }) =>
    background && {
      '--background': `var(${getContainerColor(background)})`,
    }}
`

const WrapperWithImg = styled(FactBoxWrapperStyle)<{ imagePosition: FactImagePosition }>`
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
      imagePosition === 'left'
        ? {
            gridTemplateAreas: '"image content"',
          }
        : {
            gridTemplateAreas: '"content image"',
          }}
  }
`

export type FactProps = {
  background?: BackgroundColours
  imagePosition?: FactImagePosition
} & HTMLAttributes<HTMLDivElement>

export const FactBox = forwardRef<HTMLDivElement, FactProps>(function FactBox(
  { background = 'White', imagePosition = 'left', children, ...rest },
  ref,
) {
  const hasImage = Children.toArray(children).some((child) => isValidElement(child) && child.type === Image)
  const isInverted = isInvertedColor(background)
  if (hasImage) {
    return (
      <WrapperWithImg isInverted={isInverted} imagePosition={imagePosition} background={background} ref={ref} {...rest}>
        {children}
      </WrapperWithImg>
    )
  }

  return (
    <FactBoxWrapperStyle background={background} isInverted={isInverted} ref={ref} {...rest}>
      {children}
    </FactBoxWrapperStyle>
  )
})
