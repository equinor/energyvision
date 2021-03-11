import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'
import { colors, typography } from './settings'
import { generic } from './generic'
import { elements } from './elements'

export const GlobalStyle = createGlobalStyle`
  ${colors}
  ${typography}
  ${normalize}
  ${generic}
  ${elements}
  * {
    font-family: Equinor, 'Open Sans', sans-serif;
  }
`
