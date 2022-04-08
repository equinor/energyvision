import { css } from 'styled-components'

export const elements = css`
  html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: var(--default-text);
  }

  body {
    background-color: var(--theme-background-primary);
    min-height: 100vh;
  }

  em {
    font-style: italic;
  }
  strong,
  b {
    font-weight: var(--fontWeight-bold);
  }
`
