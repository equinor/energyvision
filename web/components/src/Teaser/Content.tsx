import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledContent = styled.div`
  display: grid;
  grid-auto-columns: auto;
  align-items: center;
  align-content: start;
  padding: var(--space-xxLarge) var(--space-large);
  grid-area: content;
  /* @TODO: Revisit when we move the margins to the article layout */
  p {
    margin-bottom: 0;
  }
  ul {
    margin-bottom: var(--space-medium);
  }

  @media (min-width: 750px) {
    /*  max-height: 800px; */
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
