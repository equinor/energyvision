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
