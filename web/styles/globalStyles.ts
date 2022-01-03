import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { colors, typography, spacings, componentSettings } from './settings'
import { generic } from './generic'
import { elements } from './elements'
import { skipNavLink, cookieBot } from './components'

export const GlobalStyle = createGlobalStyle`
  /* Settings */
  ${colors}
  ${typography}
  ${spacings}
  ${componentSettings}
  /* Generic */
  ${normalize}
  ${generic}
  /* Elements */
  ${elements}
  /* Components */
  ${skipNavLink}
  ${cookieBot}
`

// Due to performance, we load the Equinor font from the /public folder in the Next.js application
// Since the Storybook uses the global styles as well, this is a separate global style constant
export const GlobalFontStyle = createGlobalStyle`
 @font-face {
  font-family: Equinor;
  font-style: normal;
  font-weight: 1 999;
  font-display: fallback;
  src: local('😊'),
        url(/fonts/equinor/EquinorVariable-VF.woff2) format('woff2-variations'),
        url(/fonts/equinor/EquinorVariable-VF.woff) format('woff-variations'),
        url(/fonts/equinor/Equinor-Regular.woff) format('woff');
}
 `
