import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { colors, typography, spacings, utility } from './settings'
import { generic } from './generic'
import { elements } from './elements'

export const GlobalStyle = createGlobalStyle`
  ${colors}
  ${typography}
  ${spacings}
  ${normalize}
  ${generic}
  ${elements}
  ${utility}
  * {
    font-family: Equinor, 'Open Sans', sans-serif;
  }

  // start @reach/skip-nav/styles.css
  :root {
    --reach-skip-nav: 1;
  }
  
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

// Due to performance, we load the Equinor font from the /public folder in the Next.js application
// Since the Storybook uses the global styles as well, this is a separate global style constant
export const GlobalFontStyle = createGlobalStyle`
 @font-face {
  font-family: Equinor;
  font-style: normal;
  font-weight: 1 999;
  font-display: fallback;
  src: local('ðŸ˜Š'),
        url(/fonts/equinor/EquinorVariable-VF.woff2) format('woff2-variations'),
        url(/fonts/equinor/EquinorVariable-VF.woff) format('woff-variations'),
        url(/fonts/equinor/Equinor-Regular.woff) format('woff');
}
 `
