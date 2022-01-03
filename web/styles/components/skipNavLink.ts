import { css } from 'styled-components'

export const skipNavLink = css`
  [data-reach-skip-nav-link] {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  [data-reach-skip-nav-link]:focus {
    padding: 1rem;
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    z-index: 1;
    width: auto;
    height: auto;
    clip: auto;
  }
  // end @reach/skip-nav/styles.css

  [data-reach-skip-nav-link]:focus {
    top: calc(var(--topbar-height) + var(--space-small));
    padding: var(--space-medium);
    background: var(--moss-green-60);
    color: var(--slate-blue-100);
  }
`
