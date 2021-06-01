import type { BackgroundColours } from '../../../types/types'

export type StyleVariants = 'none' | 'one' | 'two' | 'three' | 'four' | 'five'

function getStyleVariant(backgroundTitle: BackgroundColours) {
  let styleVariant: StyleVariants = 'none'
  if (backgroundTitle === 'White') {
    styleVariant = 'none'
  } else if (backgroundTitle === 'Moss Green') {
    styleVariant = 'one'
  } else if (backgroundTitle === 'Lichen Green') {
    styleVariant = 'two'
  } else if (backgroundTitle === 'Spruce Wood') {
    styleVariant = 'three'
  } else if (backgroundTitle === 'Mist Blue') {
    styleVariant = 'four'
  } else if (backgroundTitle === 'Slate Blue') {
    styleVariant = 'five'
  }
  return styleVariant
}

export { getStyleVariant }
