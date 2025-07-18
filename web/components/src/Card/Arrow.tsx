import styled from 'styled-components'
/* @TODO:Is it enough with the arrow link for the portrait card only? Or make this more flexible */
import { StyledPortraitCard } from './PortraitCard'

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
  ${StyledPortraitCard}:hover & {
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
    <AnimatedArrow />
  )
}
