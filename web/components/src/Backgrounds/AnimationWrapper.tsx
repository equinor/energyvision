import styled, { css, keyframes } from 'styled-components'

interface ContentProps {
  contentAlignment: 'left' | 'right' | 'center'
  useAnimation: boolean
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const AnimationWrapper = styled.div<ContentProps>`
  ${(props) =>
    props.contentAlignment !== 'center' &&
    css`
      display: flex;
      @media (min-width: 1200px) {
        width: 40vw;
      }
      > section,
      > div {
        @media (min-width: 1200px) {
          width: 100% !important;
          padding: var(--space-3xLarge) var(--space-3xLarge);
        }
      }
    `}

  ${(props) =>
    props.useAnimation &&
    css`
      padding-top: 50vh;
      padding-bottom: 50vh;

      view-timeline-name: --revealing-image;
      view-timeline-axis: block;

      /* Attach animation, linked to the View Timeline */
      animation: linear ${fadeIn} both;
      animation-timeline: --revealing-image;

      /* Tweak range when effect should run */
      animation-range: cover 30% cover 100%;
    `}

  display: flex;
`

export default AnimationWrapper
