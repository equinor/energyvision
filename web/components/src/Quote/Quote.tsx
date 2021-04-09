import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Text } from '@components'

type QuoteProps = {
  text: string
} & HTMLAttributes<HTMLDivElement>

// TODO: margin from Text is unwanted here?
const QuoteText = styled((props) => <Text {...props}></Text>)`
  font-style: italic;
  grid-area: quote;
  align-self: end;
`

export const Quote = forwardRef<HTMLDivElement, QuoteProps>(function Quote({ text, ...rest }, ref) {
  return (
    <QuoteText size="md" ref={ref} {...rest}>
      {text}
    </QuoteText>
  )
})
