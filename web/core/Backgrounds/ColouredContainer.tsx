import { forwardRef, HTMLAttributes } from 'react'
import { ColorKeyTokens } from '../../styles/colorKeyToUtilityMap'
import { getBackgroundClassesByStyles } from './backgroundStyles'
import envisTwMerge from '../../twMerge'
import getBgClassName from '../../common/helpers/getBackgroundColor'

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
  backgroundUtility?: keyof ColorKeyTokens
  /** Set return element as section */
  as?: BackgroundContainerType
  backgroundStyle: BackgroundStyle
} & HTMLAttributes<HTMLDivElement>

export const ColouredContainer = forwardRef<HTMLDivElement, ColouredContainerProps>(function BackgroundContainer(
  { backgroundUtility, children, backgroundStyle = 'regular', className = '', as = 'div', ...rest },
  ref,
) {
  const hasNoBackground = backgroundUtility === 'white-100' || backgroundUtility === '' || backgroundStyle == 'none'

  const backgroundMap = getBgClassName(backgroundUtility)

  const backgroundClassesByStyle = getBackgroundClassesByStyles(backgroundStyle)
  const classNamesForChildren = envisTwMerge(backgroundClassesByStyle, className)
  const Tag = as ?? (`div` as React.ElementType)

  return hasNoBackground ? (
    // used for components with full screen or components that do not need a wrapper due to margin
    <Tag className={`${classNamesForChildren} ${backgroundMap}`} ref={ref} {...rest}>
      {children}
    </Tag>
  ) : (
    // regular components... with padding and margin
    <Tag className={` ${backgroundMap}`} ref={ref} {...rest}>
      <div className={classNamesForChildren}>{children}</div>
    </Tag>
  )
})
