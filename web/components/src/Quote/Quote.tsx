import { forwardRef, HTMLAttributes } from 'react'
import styled from 'styled-components'
import { Text as BaseText } from '../Text'

type QuoteProps = HTMLAttributes<HTMLParagraphElement>

type TextProps = {
  weight: string
  fontSize: string
}

const Text = styled(BaseText)`
  align-self: end;
  margin: 0;
  font-style: italic;
  font-weight: var(${({ weight }: TextProps) => weight}, --fontWeight-regular);
  font-size: var(${({ fontSize }: TextProps) => fontSize}, --typeScale-1);
`

const Container = styled.div`
  grid-area: quote;
`

const SVG = styled.svg`
  fill: var(--grey-90);
  .inverted-background & {
    fill: var(--inverted-text);
  }
`

const textBoldLimit = 160
const textSizeLimit = 50

export const Quote = forwardRef<HTMLDivElement, QuoteProps>(function Quote({ children, ...rest }, ref) {
  if (!children) return null

  const quoteText = children.toString().trim()

  const weight = quoteText.length < textBoldLimit ? '--fontWeight-medium' : '--fontWeight-regular'
  const size = quoteText.length < textSizeLimit ? '--typeScale-5' : '--typeScale-2'
  const iconSize = quoteText.length < textSizeLimit ? '48px' : '36px'
  return (
    <Container>
      <SVG width={iconSize} height={iconSize} viewBox="0 0 48 48" aria-hidden={true} xmlns="http://www.w3.org/2000/svg">
        <title>Quote symbol</title>
        <path d="M24.3178 27.4196C24.3178 20.9682 29.485 14.2193 37.5942 12.7059L40.9409 15.5294C38.0002 16.5773 33.3736 20.0696 33.0856 22.5845C36.3927 23.0764 38.9218 25.7807 38.9218 29.046C38.9218 33.0391 35.4912 35.2941 32.0195 35.2941C28.0166 35.2941 24.3178 32.4016 24.3178 27.4196ZM7.05859 27.4196C7.05859 20.9682 12.2257 14.2193 20.3349 12.7059L23.3221 15.5294C20.3814 16.5773 16.1144 20.0696 15.8263 22.5845C19.1334 23.0764 21.6626 25.7807 21.6626 29.046C21.6626 33.0391 18.232 35.2941 14.7602 35.2941C10.7574 35.2941 7.05859 32.4016 7.05859 27.4196Z" />
      </SVG>
      <Text fontSize={size} weight={weight} ref={ref} {...rest}>
        {quoteText}
      </Text>
    </Container>
  )
})
