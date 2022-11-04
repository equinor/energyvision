/*
 * This hook returns a style object for the shared title
 * accordingly to its next component
 */
import { HeroTypes, TextBlockData, BackgroundColours, ContentType } from '../../types'

export type TitleStyles = {
  negativeBottomSpace: boolean
  backgroundColor: BackgroundColours
}

const BG_DEFAULT = 'White'

function useSharedTitleStyles(heroType?: HeroTypes, nextContent?: ContentType): TitleStyles {
  const defaultValue: TitleStyles = {
    negativeBottomSpace: false,
    backgroundColor: BG_DEFAULT,
  }

  if (heroType === HeroTypes.DEFAULT) {
    return defaultValue
  }

  switch (nextContent?.type) {
    case 'textBlock':
      return {
        negativeBottomSpace: true,
        backgroundColor: (nextContent as TextBlockData)?.designOptions?.background || BG_DEFAULT,
      }
    default:
      return defaultValue
  }
}

export default useSharedTitleStyles
