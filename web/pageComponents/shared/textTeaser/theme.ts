import { ColorKeyTokens } from '../../../styles/colorKeyToUtilityMap'
import { BackgroundColours } from '../../../types'

export type ThemeColors = {
  background: BackgroundColours
  highlight?: string
  backgroundUtility?: string
  textUtility?: string
  dark?: boolean
}
//Keep in sync with sanityv3/schemas/components/ThemeSelector/themeColors
/*export const getColorForTheme = (pattern: number): ThemeColors => {
  switch (pattern) {
    case 1:
      return {
        background: 'Moss Green Light',
        utility: {
          background: 'bg-moss-green-50',
          highlight: 'text-energy-red-100',
        },
      }
    case 2:
      return {
        background: 'Spruce Wood',
        utility: {
          background: 'bg-spruce-wood-90',
          highlight: 'text-energy-red-100',
        },
      }
    case 3:
      return {
        background: 'Mist Blue',
        utility: {
          background: 'bg-mist-blue-100',
          highlight: 'text-energy-red-100',
        },
      }
    case 4:
      return {
        background: 'Mid Yellow',
        utility: {
          background: 'bg-yellow-50',
          highlight: 'text-energy-red-100',
        },
      }
    case 5:
      return {
        background: 'Mid Orange',
        utility: {
          background: 'bg-orange-50',
          highlight: 'text-energy-red-100',
        },
      }
    case 6:
      return {
        background: 'Mid Blue',
        highlight: 'var(--bg-mid-orange)',
        dark: true,
        utility: {
          background: 'bg-blue-50',
          highlight: 'text-orange-50',
        },
      }
    case 7:
      return {
        background: 'Mid Blue',
        highlight: 'var(--bg-mid-yellow)',
        dark: true,
        utility: {
          background: 'bg-blue-50',
          highlight: 'text-yellow-50',
        },
      }
    case 8:
      return {
        background: 'Mid Green',
        utility: {
          background: 'bg-green-50',
          highlight: 'text-energy-red-100',
        },
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
      return { background: 'Mid Orange', highlight: 'black' }
    case 6:
      return { background: 'Mid Blue', highlight: 'var(--bg-mid-orange)' }
    case 7:
      return { background: 'Mid Blue', highlight: 'var(--bg-mid-yellow)' }
    case 8:
      return {
        background: 'Mid Blue',
        backgroundUtility: 'bg-blue-50',
        highlight: 'var(--bg-white)',
        textUtility: 'text-white-100',
      }
    case 9:
      return { background: 'Mid Green', highlight: 'black' }
    case 10:
      return {
        background: 'Mist Blue',
        backgroundUtility: 'bg-mist-blue-100',
        textUtility: 'text-blue-50',
      }

    case 0:
    default:
      return {
        background: 'White',
        backgroundUtility: 'bg-white-100',
        textUtility: 'text-energy-red-100',
      }
  }
}
