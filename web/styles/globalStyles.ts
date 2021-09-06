import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { colors, typography, spacings } from './settings'
import { generic } from './generic'
import { elements } from './elements'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Equinor;
    src: local('ðŸ˜Š'),
        url(https://eds-static.equinor.com/font/EquinorVariable-VF.woff2) format('woff2-variations'),
        url(https://eds-static.equinor.com/font/EquinorVariable-VF.woff) format('woff-variations'),
        url(https://eds-static.equinor.com/font/Equinor-Regular.woff) format('woff');
    font-style: normal;
    font-weight: 1 999;
    font-display: fallback;
}

  ${colors}
  ${typography}
  ${spacings}
  ${normalize}
  ${generic}
  ${elements}
  * {
    font-family: Equinor, 'Open Sans', sans-serif;
  }



  body {
    background-color: var(--theme-background-primary);
    min-height: 100vh;
   /*  display: flex;
    align-items: column; */
  }


 /*  #__next {
    flex: 1;
    display: flex;
    align-items: column;
  } */
`
