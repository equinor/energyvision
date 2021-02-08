import { css } from 'styled-components'

export const colors = css`
  :root {
    /* Background colors */
    --bg-moss-green: #deedee;
    --bg-mist-blue: #d5eaf4;
    --bg-litchen-green: #e6faec;
    --bg-spruce-wood: #ffe7d6;
    --bg-slate-blue: #243746;

    /* POC Theme */
    --theme-background-primary: var(--bg-moss-green);
  }

  html.dark {
    --theme-background-primary: var(--bg-slate-blue);
  }
`
