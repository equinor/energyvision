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

  body {
    background-color: var(--theme-background-primary);
    min-height: 100vh;
   /*  display: flex;
    align-items: column; */
  }

  /** How should we do this important ftw :/ */
  p {
    margin: var(--spacer-vertical-medium) 0 !important;
  }

  /** We don't need this as EDS add margin 0? */
/*   p:first-child {
    margin: 0;
  } */


 /*  #__next {
    flex: 1;
    display: flex;
    align-items: column;
  } */
`
