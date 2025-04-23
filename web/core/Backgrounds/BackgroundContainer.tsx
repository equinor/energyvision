import { forwardRef, HTMLAttributes } from 'react'
import type { BackgroundColours, BackgroundTypes, ImageBackground } from '../../types/index'
import { BackgroundContainerType, BackgroundStyle, ColouredContainer } from './ColouredContainer'
import { ColorKeyTokens } from '../../styles/colorKeyToUtilityMap'
import envisTwMerge from '../../twMerge'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'

export type BackgroundContainerProps = {
  background?: {
    type?: BackgroundTypes
    backgroundColor?: BackgroundColours
    backgroundImage?: ImageBackground
    backgroundUtility?: keyof ColorKeyTokens
    dark?: boolean
  }
  /** Render fragment if true and background color
   * is white and no id/anchor is set on it
   * @default false
   */
  renderFragmentWhenPossible?: boolean
  /** Extended tailwind styling */
  twClassName?: string
  /** Extended  styling when background image */
  scrimClassName?: string
  /* On mobile dont split background image and content */
  dontSplit?: boolean
  /** Set return element as given */
  as?: BackgroundContainerType
  /** Background style for coloured backgrounds  */
  backgroundStyle?: BackgroundStyle
} & HTMLAttributes<HTMLDivElement>

export const BackgroundContainer = forwardRef<HTMLDivElement, BackgroundContainerProps>(function BackgroundContainer(
  {
    background,
    style,
    children,
    className = '',
    scrimClassName = '',
    twClassName = '',
    id,
    renderFragmentWhenPossible = false,
    dontSplit = false,
    as = 'div',
    backgroundStyle = 'regular',
    ...rest
  },
  ref,
) {
  const { backgroundImage, type, ...restBackground } = background || {}

  return (
    <>
      {type === 'backgroundImage' && backgroundImage && (
        <ImageBackgroundContainer
          as={as}
          {...rest}
          ref={ref}
          id={id}
          {...backgroundImage}
          className={envisTwMerge(`${id ? 'scroll-mt-topbar' : ''}`, className)}
          scrimClassName={scrimClassName}
          dontSplit={dontSplit}
        >
          {children}
        </ImageBackgroundContainer>
      )}
      {(type === 'backgroundColor' || !type) && (
        <>
          {as == 'div' &&
          renderFragmentWhenPossible &&
          (restBackground?.backgroundColor === 'White' || restBackground?.backgroundUtility === 'white-100') &&
          className === '' &&
          !id ? (
            <>{children}</>
          ) : (
            <ColouredContainer
              ref={ref}
              id={id}
              {...restBackground}
              style={style}
              as={as}
              backgroundStyle={backgroundStyle}
              className={envisTwMerge(`${id ? 'scroll-mt-topbar' : ''}`, className, twClassName)}
              {...rest}
            >
              {children}
            </ColouredContainer>
          )}
        </>
      )}
    </>
  )
})
