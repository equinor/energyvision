import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type PullQuoteProps = HTMLAttributes<HTMLDivElement>

const Container = styled.figure`
  display: grid;
  row-gap: var(--spacing-medium);
  margin: var(--spacing-xLarge) 0;
  grid-template-rows:
    [media-start author-start] min-content
    [media-end author-end quote-start] min-content [quote-end];
  grid-template-columns:
    [media-start quote-start] 5rem
    [media-end spacing-start] var(--spacing-medium)
    [spacing-end author-start] 1fr [author-end quote-end];

  // TODO: find better solution for image sizing
  @media (min-width: 800px) {
    grid-template-rows:
      [quote-start media-start] min-content
      [quote-end author-start] min-content [author-end media-end];

    grid-template-columns:
      [quote-start author-start] 1fr
      [quote-end author-end spacing-start] var(--spacing-medium)
      [spacing-end media-start] 8rem [media-end];
  }
  @media (min-width: 1000px) {
    grid-template-columns:
      [quote-start author-start] 1fr
      [quote-end author-end spacing-start] var(--spacing-medium)
      [spacing-end media-start] 10rem [media-end];
  }
  @media (min-width: 1200px) {
    grid-template-columns:
      [quote-start author-start] 1fr
      [quote-end author-end spacing-start] var(--spacing-medium)
      [spacing-end media-start] 13rem [media-end];
  }
  @media (min-width: 1400px) {
    grid-template-columns:
      [quote-start author-start] 1fr
      [quote-end author-end spacing-start] var(--spacing-medium)
      [spacing-end media-start] 16rem [media-end];
  }
`

export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function BlockQuote({ children }, ref) {
  return <Container ref={ref}>{children}</Container>
})
