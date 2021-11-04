import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

export type CardProps = {
  /** What kind of card is this (we'll probably add more options to this list) */
  type?: 'news' | 'promo'
  textOnly?: boolean
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

export type StyledCardProps = {
  cardType?: 'news' | 'promo'
  textOnly?: boolean
}

export const StyledCard = styled.div<StyledCardProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  /* News cards should have white background (current status as least) Will probably change at some point */
  background-color: ${(props) => (props.cardType === 'promo' ? 'transparent' : 'var(--ui-background-default)')};
  /* If the card doesn't have media, there will be more space */
  gap: ${(props) => (props.textOnly ? 'var(--space-3xLarge)' : 'var(--space-large)')};
  padding: ${(props) => (props.textOnly ? 'var(--space-3xLarge) 0 var(--space-xLarge) 0' : '0 0 var(--space-small) 0')};

  &:hover {
    cursor: inherit;
  }
`

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { type = 'news', textOnly = false, children, ...rest },
  ref,
) {
  return (
    <StyledCard ref={ref} cardType={type} textOnly={textOnly} {...rest}>
      {children}
    </StyledCard>
  )
})
