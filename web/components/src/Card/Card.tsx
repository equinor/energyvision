import { forwardRef, HTMLAttributes } from 'react'
import { Card as EdsCard } from '@equinor/eds-core-react'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

export type CardProps = {
  /** What kind of card is this (we'll probably add more options to this list) */
  type?: 'news' | 'promo'
} & HTMLAttributes<HTMLDivElement>

/* Where should this be located. Should Card link be an actual component, or 
a more generic wrapper link component */
export const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`

export const StyledCard = styled(EdsCard)<CardProps>`
  height: 100%;
  grid-template-rows: ${(props) => (props.type === 'promo' ? 'auto auto 1fr' : 'auto auto auto 1fr')};
  /* @TODO: Spacings */
  padding: 0 0 1rem 0;

  &:hover {
    cursor: inherit;
  }
`

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ type = 'news', children, ...rest }, ref) {
  return (
    <StyledCard variant="default" ref={ref} type={type} {...rest}>
      {children}
    </StyledCard>
  )
})
