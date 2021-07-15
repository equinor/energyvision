import type { BackgroundColours } from '../../../types/types'

export type StyleVariants = 'none' | 'one' | 'two' | 'three' | 'four' | 'five'

function getStyleVariant(backgroundTitle: BackgroundColours) {
  let styleVariant: StyleVariants = 'none'
  if (backgroundTitle === 'White') {
    styleVariant = 'none'
  } else if (backgroundTitle === 'Moss Green') {
    styleVariant = 'one'
  } else if (backgroundTitle === 'Moss Green Light') {
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

type ColorMappingType = {
  [key: string]: string
}

const ColorMapping: ColorMappingType = {
  default: '--ui-background-default',
  white: '--ui-background-default',
  'moss green': '--moss-green-80',
  'moss green light': '--moss-green-50',
  'spruce wood': '--spruce-wood-90',
  'mist blue': '--mist-blue-100',
  'slate blue': '--slate-blue-100',
}

export { getStyleVariant, ColorMapping }
