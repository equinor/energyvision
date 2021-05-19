import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledContent = styled.div`
  display: grid;
  grid-gap: var(--space-large);
  grid-auto-columns: auto;
  align-items: center;
  align-content: start;
  padding: var(--space-large);
  grid-area: content;
  /* @TODO: Revisit when we move the margins to the article layout */
  p {
    margin-bottom: 0;
  }
  p + p {
    margin: 0 !important;
  }
`
export type TeaserContentProps = HTMLAttributes<HTMLDivElement>

export const Content = forwardRef<HTMLDivElement, TeaserContentProps>(function Content({ children, ...rest }, ref) {
  return (
    <StyledContent ref={ref} {...rest}>
      {children}
    </StyledContent>
  )
})
