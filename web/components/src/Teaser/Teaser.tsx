import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type TeaserProps = HTMLAttributes<HTMLElement>

export const StyledCard = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'image'
    'content';
  /*     Hardcoded value while waiting for the w3c proposal for environment()
 */
  @media (min-width: 650px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content;
  }
`

export const Teaser = forwardRef<HTMLDivElement, TeaserProps>(function Teaser({ children, ...rest }, ref) {
  return (
    <StyledCard ref={ref} {...rest}>
      {children}
    </StyledCard>
  )
})
