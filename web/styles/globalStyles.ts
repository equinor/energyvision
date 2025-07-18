import { createGlobalStyle } from 'styled-components'
import { colors, typography, spacings, componentSettings, strictLineBreak } from './settings'
import { generic } from './generic'
import { elements } from './elements'

/* We use ITCSS to structure the (few) global styles we need */
export const GlobalStyle = createGlobalStyle`
  /* Settings */
  ${colors}
  ${typography}
  ${strictLineBreak}
  ${spacings}
  ${componentSettings}
  /* Generic */
  ${generic}
  /* Elements */
  ${elements}
`

// Due to performance, we load the Equinor font from the /public folder in the Next.js application
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
