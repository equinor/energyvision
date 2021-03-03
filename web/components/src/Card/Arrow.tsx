import styled from 'styled-components'
import { StyledCard } from './Card'

const AnimatedSVG = styled.svg`
  will-change: transform;
  transition: transform 450ms;
  /* @TODO: Color var */
  stroke: #ff1243;

  ${StyledCard}:hover & {
    transition: transform 125ms;
    transform: translateX(10px);
    transition-delay: 250ms;
  }
`

export const Arrow = (): JSX.Element => {
  return (
    <AnimatedSVG
      aria-hidden={true}
      width="30"
      height="19"
      viewBox="0 0 30 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.7383 16L25.9997 9L18.7383 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 9H25.6369" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </AnimatedSVG>
  )
}
