import { defaultColors } from '../../defaultColors'
import { ColorType } from '../../objects/colorList'

// Text teaser..
export const getHighlightColorsForBackground = (background: ColorType): ColorType[] => {
  let highlightColor = defaultColors.filter((it) => ['Black', 'Energy Red'].includes(it.title))
  if (background.title == 'Mid Blue') {
    highlightColor = defaultColors.filter((it) => ['White', 'Mid Orange', 'Mid Yellow'].includes(it.title))
    console.log(highlightColor)
  }
  return highlightColor
}
