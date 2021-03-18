import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  /* Will come from the rich text editor serializers eventually */
  p {
    font-size: var(--typeScale-1);
  }
`

export type TextProps = HTMLAttributes<HTMLDivElement>

export const Text = forwardRef<HTMLDivElement, TextProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  )
})
