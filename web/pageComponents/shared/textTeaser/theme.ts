import { BackgroundColours } from '../../../types'

export type ThemeColors = {
  background: BackgroundColours
  highlight?: string
  dark?: boolean
  utility?: {
    background?: string
    highlight?: string
  }
}
//Keep in sync with sanityv3/schemas/components/ThemeSelector/themeColors
export const getColorForTheme = (pattern: number): ThemeColors => {
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
        background: 'White',
        utility: {
          background: 'bg-white-100',
          highlight: 'text-energy-red-100 ',
        },
      }
  }
}
