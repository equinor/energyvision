import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type ContainerProps = {
  hasColumns?: boolean
}

const Container = styled.div<ContainerProps>`
  /* Will come from the rich text editor serializers eventually */
  p {
    font-size: var(--typeScale-1);
  }

  margin: 0 calc(var(--spacer-vertical-xxxLarge) - var(--spacer-horizontal-medium));

  @media (min-width: 800px) {
    ${({ hasColumns }) => hasColumns && { columns: 2, columnGap: 'var(--spacing-large)' }}
  }
`

export type TextProps = {
  hasColumns?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Text = forwardRef<HTMLDivElement, TextProps>(function CardMedia({ children, hasColumns = false, ...rest }, ref) {
  return (
    <Container ref={ref} hasColumns={hasColumns} {...rest}>
      {children}
    </Container>
  )
})
