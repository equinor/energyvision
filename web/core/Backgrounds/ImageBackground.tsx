'use client'
import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useRef,
} from 'react'
import {
  getBackgroundPositionForImage,
  type Image,
  type ImageRatioKeys,
  type ObjectPositions,
} from '@/core/Image/imageUtilities'
import { getLayoutPx } from '@/lib/helpers/getCommonUtilities'
import { twMerge } from '@/lib/twMerge/twMerge'
import { resolveImage } from '@/sanity/lib/utils'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import type { BackgroundGradient, LayoutGrid } from '../../types/index'

export type ContentAlignment = 'left' | 'right' | 'center'

export type ImageBackground = {
  image: Image
  useAnimation?: boolean
  /** Layout grid for the content over the background image */
  layoutGrid?: LayoutGrid
  useGlass?: boolean
  contentAlignment?: ContentAlignment
  backgroundGradient?: BackgroundGradient
  backgroundPosition?: ObjectPositions
  /* Deprecated:  Replaced with backgroundGradient dropdown 
  TODO: Remove */
  useLight?: boolean
  useNoGradient?: boolean
}

type ImageBackgroundProps = {
  scrimClassName?: string
  /* On mobile dont split background image and content */
  dontSplit?: boolean
  /* Provide gradient in scrimClassname and disable default */
  overrideGradient?: boolean
  aspectRatio?: ImageRatioKeys
  /** Set return element as given */
  as?: ElementType
  /**  */
  isLongTitle?: boolean
} & ImageBackground &
  HTMLAttributes<HTMLElement>

export const ImageBackground = ({
  image,
  useAnimation = false,
  useGlass = false,
  contentAlignment = 'left',
  children,
  className = '',
  scrimClassName = '',
  overrideGradient = false,
  dontSplit = false,
  as,
  backgroundGradient = 'dark',
  backgroundPosition,
  layoutGrid = 'md',
  //Deprecated - TODO: Remove useLight and useNoGradient after time of transition where both options are available
  useLight,
  useNoGradient,
}: ImageBackgroundProps) => {
  //Keep same min width as ts xl breakpoint as gradient and dontSplit are connected at this point
  const isLargerDisplays = useMediaQuery(`(min-width: 80rem)`)
  const ref = useRef(null)

  const { url } = resolveImage({
    image,
    grid: 'full',
    isLargerDisplays,
  })
  const Component = as ?? 'section'
  const _noGradient = useNoGradient || backgroundGradient === 'none'
  const _lightGradient = useLight || backgroundGradient === 'light'
  const _darkGradient =
    !_lightGradient && !_noGradient && backgroundGradient === 'dark'

  const lightGradientForContentAlignment = {
    center: `${dontSplit ? 'white-center-gradient' : 'xl:white-center-gradient'} `,
    right: `${dontSplit ? 'white-right-gradient' : 'xl:white-right-gradient'}`,
    left: `${dontSplit ? 'white-left-gradient' : 'xl:white-left-gradient'}`,
    'bottom-left': `${dontSplit ? 'white-to-top-gradient' : 'xl:white-to-top-gradient'}`,
    'bottom-center': `${dontSplit ? 'white-to-top-gradient' : 'xl:white-to-top-gradient'}`,
  }
  const darkGradientForContentAlignment = {
    center: `${dontSplit ? 'black-center-gradient' : 'xl:black-center-gradient'}`,
    right: `${dontSplit ? 'black-to-right-gradient' : 'xl:black-to-right-gradient'}`,
    left: `${dontSplit ? 'black-to-left-gradient' : 'xl:black-to-left-gradient'}`,
    'bottom-left': `${dontSplit ? 'black-to-top-gradient' : 'xl:black-to-top-gradient'}`,
    'bottom-center': `${dontSplit ? 'black-to-top-gradient' : 'xl:black-to-top-gradient'}`,
  }

  let imageGradient = ''
  if (!overrideGradient && !_noGradient) {
    imageGradient = _lightGradient
      ? `${lightGradientForContentAlignment[contentAlignment]}`
      : `${darkGradientForContentAlignment[contentAlignment]}`
  }

  const contentPx = getLayoutPx(layoutGrid)
  const contentAlignmentUtility = {
    left: 'xl:mr-auto xl:pl-layout-sm xl:pr-0 xl:max-w-[48dvw]', //nothing because lg aligns with mobile . why did i add these: **:text-start *:flex *:justify-start
    center: 'text-center **:text-center *:flex *:justify-center',
    right:
      'xl:items-end xl:text-end xl:ml-auto xl:pr-layout-sm xl:pl-0 xl:max-w-[48dvw]', //  why did i add these: **:text-end *:flex *:justify-end
    'bottom-left': 'xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-center': 'xl:pl-layout-sm xl:pr-0',
  }
  const contentClassNames = twMerge(
    'items-start text-start',
    contentAlignmentUtility[contentAlignment],
  )

  const contentElement = useGlass ? (
    <div className={twMerge('**:rounded-card', className)}>
      <div className={twMerge('', contentClassNames)}>
        <div className={twMerge(`glass-border relative`)}>
          <div className='backdrop-glass' />
          <div className='z-1 flex flex-col px-6 py-4 *:z-1 lg:px-8 lg:py-6'>
            {children}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={twMerge(`${contentPx}`, contentClassNames, className)}>
      {children}
    </div>
  )

  return (
    <Component
      className={twMerge(
        `@container-size relative h-full w-full bg-center bg-cover bg-no-repeat [container:inline-size]`,
        backgroundPosition &&
          `${getBackgroundPositionForImage(backgroundPosition)}`,
        useAnimation && isLargerDisplays ? `bg-fixed` : 'bg-local',
        _darkGradient && dontSplit && 'dark',
        _darkGradient && !dontSplit && isLargerDisplays && 'dark',
        className,
      )}
      {...(((!dontSplit && isLargerDisplays) || dontSplit) && {
        style: {
          backgroundImage: `url(${url})`,
        } as CSSProperties,
      })}
      ref={ref}
    >
      {!dontSplit && !isLargerDisplays && (
        <div
          className='aspect-4/3 h-auto w-full bg-center bg-cover bg-local bg-no-repeat'
          style={{ backgroundImage: `url(${url})` } as CSSProperties}
        />
      )}
      <div
        className={twMerge(
          `py-6 xl:py-72 ${imageGradient}`,
          //properties like transform or opacity alter the stacking context.
          //This locks the child element out from "seeing" the canvas layout beneath
          //the glass effect will not work together with animate-timeline that uses opacity.
          useAnimation && !useGlass && 'xl:animate-timeline',
          dontSplit && 'py-40',
          scrimClassName,
        )}
      >
        {contentElement}
      </div>
    </Component>
  )
}
