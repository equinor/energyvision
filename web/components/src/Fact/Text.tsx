import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type ContainerProps = {
  columns?: number
}

const Container = styled.div`
  /* Will come from the rich text editor serializers eventually */
  p {
    font-size: var(--typeScale-1);
  }

  ${({ columns }: ContainerProps) =>
    columns && {
      columnCount: columns,
    }}
`

export type TextProps = {
  columns?: number
} & HTMLAttributes<HTMLDivElement>

export const Text = forwardRef<HTMLDivElement, TextProps>(function CardMedia({ children, ...rest }, ref) {
  return (
    <Container ref={ref} {...rest}>
      {children}
    </Container>
  )
})
