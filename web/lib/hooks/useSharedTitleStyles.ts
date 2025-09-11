/*
 * This hook returns a style object for the shared title
 * accordingly to its next component
 */

import { BackgroundContainerProps } from '@/core/Backgrounds'
import { HeroTypes, TextBlockData, ContentType } from '../../types'

export type TitleStyles = BackgroundContainerProps

function useSharedTitleStyles(heroType?: HeroTypes, nextContent?: ContentType): TitleStyles {
  const defaultValue: TitleStyles = {
    background: {
      backgroundUtility: 'white-100',
    },
  }

  if (heroType === HeroTypes.DEFAULT) {
    return defaultValue
  }

  switch (nextContent?.type) {
    case 'textBlock':
      return {
        background: {
          backgroundUtility: (nextContent as TextBlockData)?.designOptions?.background?.backgroundUtility,
          backgroundColor: (nextContent as TextBlockData)?.designOptions?.background?.backgroundColor,
        },
      }
    default:
      return defaultValue
  }
}

export default useSharedTitleStyles
