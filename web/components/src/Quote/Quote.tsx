import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'

type QuoteProps = {
  text: string
} & HTMLAttributes<HTMLDivElement>

type TextProps = {
  weight: string
  size: string
}

const Text = styled.p`
  grid-area: quote;
  align-self: end;
  margin: 0;
  font-style: italic;
  line-height: var(--lineHeight-3);
  font-weight: var(${({ weight }: TextProps) => weight}, --fontWeight-regular);
  font-size: var(${({ size }: TextProps) => size}, --typeScale-1);
`

const textBoldLimit = 160
const textSizeLimit = 50

export const Quote = forwardRef<HTMLDivElement, QuoteProps>(function Quote({ text, ...rest }, ref) {
  const quoteText = text.trim()

  const weight = quoteText.length < textBoldLimit ? '--fontWeight-medium' : '--fontWeight-regular'
  const size = quoteText.length < textSizeLimit ? '--typeScale-5' : '--typeScale-2'

  return (
    <Text size={size} weight={weight} ref={ref} {...rest}>
      {quoteText}
    </Text>
  )
})
