import type { FlattenSimpleInterpolation } from 'styled-components'

export type StyledCSS = FlattenSimpleInterpolation
// eslint-disable-next-line
type Shorthand = (token: { width?: string | number; style?: string; color?: string }) => string

export const shorthand: Shorthand = (token) => {
  const { width = '', style = 'solid', color = '' } = token

  return `${width} ${style} ${color}`
}
