import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { colors, typography, spacings } from './settings'
import { generic } from './generic'
import { elements } from './elements'

export const GlobalStyle = createGlobalStyle`
  ${colors}
  ${typography}
  ${spacings}
  ${normalize}
  ${generic}
  ${elements}
  * {
    font-family: Equinor, 'Open Sans', sans-serif;
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
