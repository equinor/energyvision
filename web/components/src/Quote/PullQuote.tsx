import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type PullQuoteProps = HTMLAttributes<HTMLDivElement>

const Container = styled.figure`
  display: grid;
  row-gap: var(--spacing-medium);
  margin: var(--spacing-xLarge) 0;
  grid-template-rows: min-content min-content;
  grid-template-columns: 5rem var(--spacing-medium) 1fr;
  grid-template-areas:
    'media spacing author'
    'quote quote quote';

  // TODO: find better solution for image sizing
  @media (min-width: 800px) {
    grid-template-columns: 1fr var(--spacing-medium) 8rem;
    grid-template-areas:
      'quote spacing media'
      'author spacing media';
  }
  @media (min-width: 1000px) {
    grid-template-columns: 1fr var(--spacing-medium) 10rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr var(--spacing-medium) 13rem;
  }
  @media (min-width: 1400px) {
    grid-template-columns: 1fr var(--spacing-medium) 16rem;
  }
`

export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function BlockQuote({ children }, ref) {
  return <Container ref={ref}>{children}</Container>
})
