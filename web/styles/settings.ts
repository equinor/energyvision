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
export const typography = css`
  :root {
    --typeScale-base: 1.2rem;
    --typeScale-multiplier: 1.2;
    --typeScale-1: var(--typeScale-base);
    --typeScale-2: calc(var(--typeScale-1) * var(--typeScale-multiplier));
    --typeScale-3: calc(var(--typeScale-2) * var(--typeScale-multiplier));
    --typeScale-4: calc(var(--typeScale-3) * var(--typeScale-multiplier));
    --typeScale-5: calc(var(--typeScale-4) * var(--typeScale-multiplier));
    --typeScale-0: calc(var(--typeScale-1) / var(--typeScale-multiplier));

    @media (min-width: 768px) {
      --typeScale-base: 1.25rem;
    }
  }
`
