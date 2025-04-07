import { forwardRef, HTMLAttributes } from 'react'
import { BackgroundColours } from '../../../types/index'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../../styles/colorKeyToUtilityMap'
import { twMerge } from 'tailwind-merge'

type ColouredContainerProps = {
  backgroundColor?: BackgroundColours
  backgroundUtility?: keyof ColorKeyTokens
  dark?: boolean
  /** Set return element as section */
  asSection?: boolean
} & HTMLAttributes<HTMLDivElement>

export const ColouredContainer = forwardRef<HTMLDivElement, ColouredContainerProps>(function BackgroundContainer(
  { backgroundColor = 'White', backgroundUtility, dark, children, className = '', asSection = false, ...rest },
  ref,
) {
  const colorKey =
    Object.keys(colorKeyToUtilityMap).find(
      (it) => colorKeyToUtilityMap[it].backgroundName.toLowerCase() == backgroundColor.toLowerCase(),
    ) || 'white-100'
  const backgroundMap = backgroundUtility
    ? colorKeyToUtilityMap[backgroundUtility].background
    : colorKeyToUtilityMap[colorKey].background

  const classNames = twMerge(`${className} ${dark ? 'dark' : ''}  ${backgroundMap}`)
  return asSection ? (
    <section className={classNames} ref={ref} {...rest}>
      {children}
    </section>
  ) : (
    <div className={classNames} ref={ref} {...rest}>
      {children}
    </div>
  )
})
