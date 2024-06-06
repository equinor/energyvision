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
    -webkit-font-smoothing: antialiased;
  }

  em {
    font-style: italic;
  }
  strong,
  b {
    font-weight: var(--fontWeight-bold);
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #root,
  #__next {
    isolation: isolate;
  }

  .video-js video {
    object-fit: cover;
  }

  // To make video control bar always visible when autoplay is disabled.
  .vjs-paused .vjs-control-bar {
    display: flex;
  }

  // Fix poster image for looping video banners/ full width videos
  .vjs-poster img {
    object-fit: cover;
  }
`
