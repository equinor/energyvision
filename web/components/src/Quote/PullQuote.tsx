import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type PullQuoteProps = HTMLAttributes<HTMLDivElement>

const Container = styled.figure`
  display: grid;
  row-gap: var(--spacing-medium);
  margin: 0;
  position: relative;
  /* margin: var(--spacing-xLarge) 0; */
  grid-template-rows: min-content min-content;
  grid-template-columns: 5rem var(--spacing-medium) 1fr;
  grid-template-areas:
    'media spacing author'
    'quote quote quote';

  @media (min-width: 800px) {
    grid-template-columns: 1fr var(--spacing-medium) 164px;
    grid-template-areas:
      'quote spacing media'
      'author spacing media';
  }
  @media (min-width: 1440px) {
    grid-template-columns: 1fr var(--spacing-medium) 220px;
  }
  @media (min-width: 1920px) {
    grid-template-columns: 1fr var(--spacing-medium) 294px;
  }
`

export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function BlockQuote({ children }, ref) {
  return <Container ref={ref}>{children}</Container>
})
