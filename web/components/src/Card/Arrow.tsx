import styled from 'styled-components'
import { StyledCard } from './Card'

/* const AnimatedSVG = styled.svg`
  will-change: transform;
  transition: transform 450ms;
 
  stroke: #ff1243;

  ${StyledCard}:hover & {
    transition: transform 125ms;
    transform: translateX(10px);
    transition-delay: 250ms;
  }
` */
const AnimatedArrow = styled.span`
  position: relative;
  display: inline-block;
  padding: 8px 0;
  &:before {
    content: '';
    display: block;
    width: 28px;
    height: 2px;
    margin-right: 2px;
    background-color: #ff1243;
    top: 50%;
    will-change: transition;
    transition: width 450ms ease-out;
  }
  &:after {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-top: 2px solid #ff1243;
    border-right: 2px solid #ff1243;
    transform: rotate(45deg);
    top: calc(50% - 5px);
    position: absolute;
    right: 2px;
  }
  ${StyledCard}:hover & {
    cursor: pointer;
    &:before {
      width: 40px;
      transition: width 125ms;
      transition-delay: 250ms;
    }
  }
`

export const Arrow = (): JSX.Element => {
  return (
    /*   <AnimatedSVG
      aria-hidden={true}
      width="30"
      height="19"
      viewBox="0 0 30 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.7383 16L25.9997 9L18.7383 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 9H25.6369" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </AnimatedSVG> */

    <AnimatedArrow />
  )
}
