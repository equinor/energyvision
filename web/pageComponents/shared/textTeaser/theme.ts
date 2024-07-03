import { BackgroundColours } from '../../../types'

export type ThemeColors = {
  background?: BackgroundColours
  highlight?: string
  backgroundUtility?: string
  textUtility?: string
  dark?: boolean
}
//Keep in sync with sanityv3/schemas/components/ThemeSelector/themeColors
export const getColorForTheme = (pattern?: number): ThemeColors => {
  switch (pattern) {
    case 1:
      return {
        background: 'Moss Green Light',
        backgroundUtility: 'bg-moss-green-50',
        textUtility: 'text-energy-red-100',
      }
    case 2:
      return {
        background: 'Spruce Wood',
        backgroundUtility: 'bg-spruce-wood-90',
        textUtility: 'text-slate-80',
      }
    case 3:
      return {
        background: 'Mist Blue',
        backgroundUtility: 'bg-mist-blue-100',
        textUtility: 'text-slate-80',
      }
    case 4:
      return {
        background: 'Mid Yellow',
        backgroundUtility: 'bg-yellow-50',
        textUtility: 'text-slate-80',
      }
    case 5:
      return {
        background: 'Mid Orange',
        highlight: 'black',
        backgroundUtility: 'bg-orange-50',
        textUtility: 'text-slate-80',
      }
    case 6:
      return {
        background: 'Mid Blue',
        highlight: 'var(--bg-mid-orange)',
        backgroundUtility: 'bg-blue-50',
        textUtility: 'text-orange-50',
        dark: true,
      }
    case 7:
      return {
        background: 'Mid Blue',
        backgroundUtility: 'bg-blue-50',
        highlight: 'var(--bg-mid-yellow)',
        textUtility: 'text-yellow-50',
        dark: true,
      }
    case 8:
      return {
        background: 'Mid Blue',
        backgroundUtility: 'bg-blue-50',
        highlight: 'var(--bg-white)',
        textUtility: 'text-white-100',
        dark: true,
      }
    case 9:
      return {
        background: 'Mid Green',
        backgroundUtility: 'bg-green-50',
        highlight: 'black',
        textUtility: 'text-slate-80',
      }
    case 10:
      return {
        background: 'Mist Blue',
        backgroundUtility: 'bg-mist-blue-100',
        textUtility: 'text-blue-50',
      }
    case 11:
      return {
        textUtility: 'text-slate-80',
      }
    case 12:
      return {
        textUtility: 'text-white-100',
        dark: true,
      }
    case 13:
      return {
        background: 'Moss Green Light',
        backgroundUtility: 'bg-moss-green-50',
        textUtility: 'text-slate-80',
      }
    case 0:
      return {
        background: 'White',
        backgroundUtility: 'bg-white-100',
        textUtility: 'text-energy-red-100',
      }
    default:
      return {}
  }
}
