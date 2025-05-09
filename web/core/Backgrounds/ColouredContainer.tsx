import { forwardRef, HTMLAttributes } from 'react'
import { BackgroundColours } from '../../types/index'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import { getBackgroundClassesByStyles } from './backgroundStyles'
import envisTwMerge from '../../twMerge'

export type BackgroundContainerType = 'section' | 'div' | 'article' | 'figure' | 'nav'
/**
 *  **regular** : Includes a background wrapper with default padding,  max width and margin on the component.
 *
 *  **wide**: Includes a background wrapper with no padding but has default margin and max width. To be used in components when they need a wrapper for color with margin and max width but no padding.
 *
 *  **none**: No wrapper. Renders component as is with background color provided
 */
export type BackgroundStyle = 'regular' | 'none' | 'wide'
type ColouredContainerProps = {
  backgroundColor?: BackgroundColours
  backgroundUtility?: keyof ColorKeyTokens
  dark?: boolean
  /** Set return element as section */
  as?: BackgroundContainerType
  backgroundStyle: BackgroundStyle
} & HTMLAttributes<HTMLDivElement>

export const ColouredContainer = forwardRef<HTMLDivElement, ColouredContainerProps>(function BackgroundContainer(
  {
    backgroundColor = 'White',
    backgroundUtility,
    dark: utilityDark,
    children,
    backgroundStyle = 'regular',
    className = '',
    as = 'div',
    ...rest
  },
  ref,
) {
  const colorKey =
    Object.keys(colorKeyToUtilityMap).find(
      (it) => colorKeyToUtilityMap[it].backgroundName.toLowerCase() == backgroundColor.toLowerCase(),
    ) || 'white-100'
  const hasNoBackground = colorKey === 'white-100' || backgroundStyle == 'none'
  const backgroundMap = backgroundUtility
    ? colorKeyToUtilityMap[backgroundUtility].background
    : colorKeyToUtilityMap[colorKey].background
  const darkMap = backgroundUtility ? colorKeyToUtilityMap[backgroundUtility].dark : colorKeyToUtilityMap[colorKey].dark
  const dark = utilityDark || darkMap
  const backgroundClassesByStyle = getBackgroundClassesByStyles(backgroundStyle)
  const classNamesForChildren = envisTwMerge(backgroundClassesByStyle, className)
  const Tag = as ?? (`div` as React.ElementType)

  return hasNoBackground ? (
    // used for components with full screen or components that do not need a wrapper due to margin
    <Tag className={`${classNamesForChildren} ${dark ? 'dark' : ''} ${backgroundMap}`} ref={ref} {...rest}>
      {children}
    </Tag>
  ) : (
    // regular components... with padding and margin
    <Tag className={`${dark ? 'dark' : ''} ${backgroundMap}`} ref={ref} {...rest}>
      <div className={classNamesForChildren}>{children}</div>
    </Tag>
  )
})
