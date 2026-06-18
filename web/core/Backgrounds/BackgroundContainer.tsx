import type { ElementType, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { getBgAndDarkFromBackground } from '../../styles/colorKeyToUtilityMap'
import type { Background } from '../../types/index'
import { ImageBackground } from './ImageBackground'

export type BackgroundContainerProps = {
  background?: Background
  /** Extended  styling when background image */
  scrimClassName?: string
  /* On mobile dont split background image and content to stack  */
  dontSplit?: boolean
  /** Set return element as given */
  as?: ElementType
} & HTMLAttributes<HTMLElement>

export const BackgroundContainer = ({
  background,
  children,
  className = '',
  scrimClassName = '',
  id,
  dontSplit = false,
  as,
}: BackgroundContainerProps) => {
  const Component = as ?? 'section'

  const isColor =
    !background ||
    background?.type !== 'backgroundImage' ||
    (background?.type === 'backgroundImage' &&
      !background?.backgroundImage?.image?.asset)

  const { backgroundImage } = background ?? {}
  //If no background, falls back to empty bg.
  const { bg, dark } = getBgAndDarkFromBackground({ background })

  const commonClassNames = `${id ? 'scroll-mt-topbar' : ''}`

  return (
    <>
      {!isColor && backgroundImage ? (
        <ImageBackground
          as={as}
          id={id}
          className={twMerge(commonClassNames, className)}
          scrimClassName={scrimClassName}
          dontSplit={dontSplit}
          {...backgroundImage}
        >
          {children}
        </ImageBackground>
      ) : (
        <Component
          id={id}
          className={twMerge(
            commonClassNames,
            `${bg} ${dark ? 'dark' : ''}`,
            className,
          )}
        >
          {children}
        </Component>
      )}
    </>
  )
}
