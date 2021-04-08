import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

export type PullQuoteProps = HTMLAttributes<HTMLDivElement>

// TODO: fix grid sizing, especially for image
const Container = styled.figure`
  display: grid;
  grid-template-columns: 1fr 1fr var(--spacing-medium) 300px;
  grid-template-rows: min-content min-content;
  row-gap: var(--spacing-medium);
  margin: var(--spacing-xLarge) 0;
`

export const PullQuote = forwardRef<HTMLDivElement, PullQuoteProps>(function BlockQuote({ children }, ref) {
  return <Container ref={ref}>{children}</Container>
})
