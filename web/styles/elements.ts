import { css } from 'styled-components'

export const elements = css`
  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: clamp(16px, calc(14.3125px + 0.4531vw), 23px);
  }
  body {
    background-color: var(--theme-background-primary);
    min-height: 100vh;
  }
`
