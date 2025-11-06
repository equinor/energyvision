import { DesignOptions } from '../types'

export type SanityColor = {
  title: string
  key: string
  dark?: boolean
  value: string
  onlyTextColor?: boolean
}
export type TWColor = {
  backgroundName: string
  background: string
  dark?: boolean
  text: string
}

export const colorKeyToUtilityMap: Record<string, TWColor> = {
  'blue-50': {
    backgroundName: 'Mid Blue',
    background: 'bg-blue-50',
    text: 'text-blue-50',
    dark: true,
  },
  'white-100': {
    backgroundName: 'White',
    background: 'bg-white-100',
    text: 'text-white-100',
  },
  'moss-green-50': {
    backgroundName: 'Moss Green Light',
    background: 'bg-moss-green-50',
    text: 'text-moss-green-50',
  },
  'spruce-wood-90': {
    backgroundName: 'Spruce Wood',
    background: 'bg-spruce-wood-90',
    text: 'text-spruce-wood-90',
  },
  'mist-blue-100': {
    backgroundName: 'Mist Blue',
    background: 'bg-mist-blue-100',
    text: 'text-mist-blue-100',
  },
  'energy-red-100': {
    backgroundName: 'Energy Red',
    background: 'bg-energy-red-100',
    text: 'text-energy-red-100',
  },
  'green-50': {
    backgroundName: 'Mid Green',
    background: 'bg-green-50',
    text: 'text-green-50',
  },
  'yellow-50': {
    backgroundName: 'Mid Yellow',
    background: 'bg-yellow-50',
    text: 'text-yellow-50',
  },
  'orange-50': {
    backgroundName: 'Mid Orange',
    background: 'bg-orange-50',
    text: 'text-orange-50',
  },
  'slate-blue-95': {
    backgroundName: 'Slate Blue 95',
    background: 'bg-slate-blue-95',
    text: 'text-white-100',
    dark: true,
  },
  'norwegin-woods-40': {
    backgroundName: 'Light green',
    background: 'bg-norwegin-woods-40',
    text: 'text-norwegin-woods-40',
  },
  'sand-and-summer-50': {
    backgroundName: 'Sand',
    background: 'bg-sand-and-summer-50',
    text: 'text-sand-and-summer-50',
  },
  'norwegian-woods-40': {
    backgroundName: 'Light green',
    background: 'bg-norwegian-woods-40',
    text: 'text-norwegian-woods-40',
  },
  'sprucewood-20': {
    backgroundName: 'Light Spruce wood',
    background: 'bg-sprucewood-20',
    text: 'text-sprucewood-20',
  },
  'yellow-20': {
    backgroundName: 'Light yellow',
    background: 'bg-yellow-20',
    text: 'text-yellow-20',
  },
  'blue-20': {
    backgroundName: 'Light blue',
    background: 'bg-blue-20',
    text: 'text-blue-20',
  },
  //gray did not work with bg- and text-. trying another name
  'gray-20': {
    backgroundName: 'Light gray',
    background: 'bg-stone-20',
    text: 'text-stone-20',
  },
}
export type ColorKeys = keyof typeof colorKeyToUtilityMap

export type ColorKeyTokens = {
  [P1 in keyof typeof colorKeyToUtilityMap]: string
}

export const getBgAndDarkFromBackground = (designOptions?: DesignOptions) => {
  if (!designOptions) {
    return { bg: '', dark: false }
  }
  const { background } = designOptions || {}
  const backwardCompabilityColorName = Object.keys(colorKeyToUtilityMap).find(
    (key) => colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName === background?.backgroundColor,
  )

  let bgKey = 'white-100'
  if (backwardCompabilityColorName && backwardCompabilityColorName !== '') {
    bgKey = backwardCompabilityColorName
  }
  if (background?.backgroundUtility && background?.backgroundUtility !== '') {
    bgKey = background?.backgroundUtility
  }

  return { bg: colorKeyToUtilityMap[bgKey].background, dark: colorKeyToUtilityMap[bgKey].dark }
}
