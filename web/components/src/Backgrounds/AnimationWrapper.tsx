import styled, { css, keyframes } from 'styled-components'

interface ContentProps {
  contentAlignment: 'left' | 'right' | 'center'
  useAnimation: boolean
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  50%{
    opacity:1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`

const AnimationWrapper = styled.div<ContentProps>`
  background-image: ${({ useAnimation }) =>
    useAnimation ? 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))' : ''};
  ${(props) =>
    props.contentAlignment !== 'center' &&
    css`
      display: flex;

      @media (min-width: 1200px) {
        display: flex;
        width: 100%;
        justify-content: ${props.contentAlignment === 'right' ? 'end' : 'start'};
      }
      > section,
      > div {
        @media (min-width: 1200px) {
          width: 45vw;
          //width: 100% !important;
          margin: 0 var(--layout-paddingHorizontal-small);
          padding: var(--space-3xLarge) 0;
        }
      }
    `}

  ${(props) =>
    props.useAnimation &&
    css`
      > section,
      > div {
        padding-top: 50vh;
        padding-bottom: 50vh;
      }
      view-timeline-name: --revealing-image;
      view-timeline-axis: block;

      /* Attach animation, linked to the View Timeline */
      animation: linear ${fadeIn} both;
      animation-timeline: --revealing-image;

      /* Tweak range when effect should run */
      animation-range: cover 30% cover 80%;

      display: flex;
    `}
`

export default AnimationWrapper
