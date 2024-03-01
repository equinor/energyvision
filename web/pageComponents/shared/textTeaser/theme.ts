import { BackgroundColours } from '../../../types'

export type ThemeColors = {
  background: BackgroundColours
  highlight?: string
}
//Keep in sync with sanityv3/schemas/components/ThemeSelector/themeColors
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
