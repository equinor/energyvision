import { ElementType, forwardRef, HTMLAttributes } from 'react'
import type { Background } from '../../types/index'
import { getBgAndDarkFromBackground } from '../../styles/colorKeyToUtilityMap'
import { ImageBackgroundContainer } from './ImageBackgroundContainer'
import { twMerge } from 'tailwind-merge'

export type BackgroundContainerProps = {
  background?: Background
  /** Extended  styling when background image */
  scrimClassName?: string
  /* On mobile dont split background image and content */
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
  as = 'section',
}: BackgroundContainerProps) => {
  const ContainerElement = as ?? (`section` as ElementType)
  const isColor =
    !background ||
    background?.type !== 'backgroundImage' ||
    (background?.type === 'backgroundImage' && !background?.backgroundImage?.image?.asset)

  const { backgroundImage } = background ?? {}
  //If no background, falls back to empty bg.
  const { bg, dark } = getBgAndDarkFromBackground({ background })

  const commonClassNames = `${id ? 'scroll-mt-topbar' : ''}`

  return (
    <>
      {!isColor && backgroundImage ? (
        <ImageBackgroundContainer
          as={as}
          id={id}
          className={twMerge(commonClassNames, className)}
          scrimClassName={scrimClassName}
          dontSplit={dontSplit}
          {...backgroundImage}
        >
          {children}
        </ImageBackgroundContainer>
      ) : (
        <ContainerElement id={id} className={twMerge(commonClassNames, `${bg} ${dark ? 'dark' : ''}`, className)}>
          {children}
        </ContainerElement>
      )}
    </>
  )
}
