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
