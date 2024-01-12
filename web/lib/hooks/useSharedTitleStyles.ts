/*
 * This hook returns a style object for the shared title
 * accordingly to its next component
 */
import { BackgroundContainerProps } from '@components/Backgrounds'
import { HeroTypes, TextBlockData, ContentType } from '../../types'

export type TitleStyles = BackgroundContainerProps

const BG_DEFAULT = 'White'

function useSharedTitleStyles(heroType?: HeroTypes, nextContent?: ContentType): TitleStyles {
  const defaultValue: TitleStyles = {
    background: BG_DEFAULT,
  }

  if (heroType === HeroTypes.DEFAULT) {
    return defaultValue
  }

  switch (nextContent?.type) {
    case 'textBlock':
      return {
        background: (nextContent as TextBlockData)?.designOptions?.background || BG_DEFAULT,
      }
    default:
      return defaultValue
  }
}

export default useSharedTitleStyles
