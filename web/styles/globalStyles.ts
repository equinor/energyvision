import { createGlobalStyle } from 'styled-components'
import { colors, typography, spacings, componentSettings, strictLineBreak } from './settings'
import { normal } from './themes'

/* We use ITCSS to structure the (few) global styles we need */
export const GlobalStyle = createGlobalStyle`
  /* Settings */
  :root{
  ${normal}
  }
  ${colors}
  ${typography}
  ${strictLineBreak}
  ${spacings}
  ${componentSettings}
`
