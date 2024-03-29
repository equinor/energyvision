export const colorKeyToUtilityMap = {
  'blue-50': {
    background: 'bg-blue-50',
    text: 'text-blue-50',
  },
  'white-100': {
    background: 'bg-white-100',
    text: 'text-white-100',
  },
  'moss-green-50': {
    background: 'bg-moss-green-50',
    text: 'text-moss-green-50',
  },
  'spruce-wood-90': {
    background: 'bg-spruce-wood-900',
    text: 'text-spruce-wood-90',
  },
  'mist-blue-100': {
    background: 'bg-mist-blue-100',
    text: 'text-mist-blue-100',
  },
  'energy-red-100': {
    background: 'bg-energy-red-100',
    text: 'text-energy-red-100',
  },
  'green-50': {
    background: 'bg-green-50',
    text: 'text-green-50',
  },
  'yellow-50': {
    background: 'bg-yellow-50',
    text: 'text-yellow-50',
  },
  'orange-50': {
    background: 'bg-orange-50',
    text: 'text-orange-50',
  },
}
export type ColorKeyTokens = {
  [P1 in keyof typeof colorKeyToUtilityMap]: string
}
