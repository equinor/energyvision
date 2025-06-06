export const colorKeyToUtilityMap: Record<
  string,
  { backgroundName: string; background: string; text: string; dark?: boolean }
> = {
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
}
export type ColorKeyTokens = {
  [P1 in keyof typeof colorKeyToUtilityMap]: string
}
