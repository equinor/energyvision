import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Text } from '@components'

type QuoteProps = {
  text: string
} & HTMLAttributes<HTMLDivElement>

// TODO: margin from Text is unwanted here?
const QuoteText = styled((props) => <Text {...props}></Text>)`
  grid-area: quote;
  align-self: end;
`

const textBoldLimit = 160

export const Quote = forwardRef<HTMLDivElement, QuoteProps>(function Quote({ text, ...rest }, ref) {
  return (
    <QuoteText size="md" italic bold={text.length < textBoldLimit} ref={ref} {...rest}>
      {text}
    </QuoteText>
  )
})
