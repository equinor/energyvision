import colors from '../colorConfig'

export const defaultColors = [
  {
    title: 'White',
    value: colors.white[100],
    key: 'white-100',
    dark: false,
  },
  {
    title: 'Moss Green Light',
    value: colors['moss-green'][50],
    key: 'moss-green-50',
    dark: false,
  },
  {
    title: 'Spruce Wood',
    value: colors['spruce-wood'][90],
    key: 'spruce-wood-90',
    dark: false,
  },
  { title: 'Mist Blue', value: colors['mist-blue'][100], key: 'mist-blue-100', dark: false },
  { title: 'Mid Yellow', value: colors.yellow[50], key: 'yellow-50', dark: false },
  { title: 'Mid Orange', value: colors.orange[50], key: 'orange-50', dark: false },
  { title: 'Mid Blue', value: colors.blue[50], key: 'blue-50', dark: true },
  { title: 'Mid Green', value: colors.green[50], key: 'green-50', dark: false },
  { title: 'Energy Red', value: colors['energy-red'][100], key: 'energy-red-50', dark: false, onlyTextColor: true },
  { title: 'Black', value: 'rgba(61, 61, 61, 1)', key: 'slate-80', dark: false, onlyTextColor: true },
]
