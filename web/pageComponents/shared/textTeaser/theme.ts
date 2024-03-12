import { BackgroundColours } from '../../../types'

export type ThemeColors = {
  background: BackgroundColours
  highlight?: string
}
//Keep in sync with sanityv3/schemas/components/ThemeSelector/themeColors
// When converting to tailwind
/* export const getColorForTheme = (pattern: number) => {
  switch (pattern) {
    case 1:
      return {
        background: 'bg-moss-green-50',
        highlight: 'text-energy-red-100',
      }
    case 2:
      return {
        background: 'bg-spruce-wood-90',
        highlight: 'text-energy-red-100',
      }
    case 3:
      return {
        background: 'bg-mist-blue-100',
        highlight: 'text-energy-red-100',
      }
    case 4:
      return {
        background: 'bg-yellow-50',
        highlight: 'text-energy-red-100',
      }
    case 5:
      return {
        background: 'bg-orange-50',
        highlight: 'text-energy-red-100',
      }
    case 6:
      return {
        background: 'bg-blue-50',
        dark: true,
        highlight: 'text-orange-50',
      }
    case 7:
      return {
        background: 'bg-blue-50',
        dark: true,
        highlight: 'text-yellow-50',
      }
    case 8:
      return {
        background: 'bg-green-50',
        highlight: 'text-energy-red-100',
      }

    case 0:
    default:
      return {
        background: 'bg-white-100',
        highlight: 'text-energy-red-100 ',
      }
  }
}
 */

export const getColorForTheme = (pattern: number): ThemeColors => {
  switch (pattern) {
    case 1:
      return { background: 'Moss Green Light' }
    case 2:
      return { background: 'Spruce Wood' }
    case 3:
      return { background: 'Mist Blue' }
    case 4:
      return { background: 'Mid Yellow' }
    case 5:
      return { background: 'Mid Orange' }
    case 6:
      return { background: 'Mid Blue', highlight: 'var(--bg-mid-orange)' }
    case 7:
      return { background: 'Mid Blue', highlight: 'var(--bg-mid-yellow)' }
    case 8:
      return { background: 'Mid Green' }

    case 0:
    default:
      return { background: 'White' }
  }
}
