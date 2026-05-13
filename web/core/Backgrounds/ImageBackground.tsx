'use client'

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useRef,
} from 'react'
import type { Image, ImageRatioKeys } from '@/core/Image/Image'
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
  isLongTitle = false,
  as,
  backgroundGradient = 'none',
  layoutGrid = 'md',
  //Deprecated - TODO: Remove useLight and useNoGradient after time of transition where both options are available
  useLight,
  useNoGradient,
}: ImageBackgroundProps) => {
  console.log('backgroundGradient', backgroundGradient)
  console.log('contentAlignment', contentAlignment)
  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)
  const ref = useRef(null)

  console.log('ImageBackground isLargerDisplays', isLargerDisplays)

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

  const backgroundClassNames = `
      @container-size
      [container:inline-size]
      relative
      w-full
      h-full
      bg-center
      bg-no-repeat
      bg-cover
      ${useAnimation && isLargerDisplays ? `bg-fixed` : 'bg-local'}
      ${_darkGradient ? 'dark' : ''}
    `

  const lightGradientForContentAlignment = {
    center: 'white-center-gradient',
    right: 'white-center-gradient xl:white-right-gradient',
    left: 'white-center-gradient xl:white-left-gradient',
    'bottom-left': 'white-to-top-gradient',
    'bottom-center': 'white-to-top-gradient',
  }
  const darkGradientForContentAlignment = {
    center: '',
    right: 'xl:black-to-right-gradient',
    left: 'xl:black-to-left-gradient',
    'bottom-left': 'black-to-top-gradient',
    'bottom-center': 'black-to-top-gradient',
  }

  let animatedScrimGradient = ''
  if (!overrideGradient && !_noGradient) {
    animatedScrimGradient = _lightGradient
      ? `${lightGradientForContentAlignment[contentAlignment]}`
      : `black-center-gradient ${darkGradientForContentAlignment[contentAlignment]}`
  }

  const contentAlignmentClassNames = {
    center: 'items-start text-start px-layout-lg',
    right: `items-start text-start px-layout-lg xl:items-end xl:text-end ${isLongTitle ? 'xl:max-w-[52cqw]' : 'xl:max-w-[45cqw]'} xl:ml-auto xl:pr-layout-sm xl:pl-0`,
    left: `items-start text-start px-layout-lg xl:items-start ${isLongTitle ? 'xl:max-w-[52cqw]' : 'xl:max-w-[45cqw]'}  xl:mr-auto xl:pl-layout-sm xl:pr-0`,
    'bottom-left':
      'items-start text-start px-layout-lg xl:mr-auto xl:pl-layout-sm xl:pr-0',
    'bottom-center':
      'items-start text-start px-layout-lg xl:pl-layout-sm xl:pr-0',
  }

  const backgroundImageContentClassNames = `justify-center py-14`

  /*     if (contentAlignment) {
      backgroundImageContentClassNames = twMerge(
        backgroundImageContentClassNames,
        `${contentAlignmentClassNames[contentAlignment]}`,
      )
    } */

  const contentPx = getLayoutPx(layoutGrid)
  const contentAlignmentUtility = {
    left: 'text-start **:text-start *:flex *:justify-start',
    center: 'text-center **:text-center *:flex *:justify-center',
    right: 'text-end **:text-end *:flex *:justify-end',
  }
  //<div className='mx-auto max-w-content px-layout-sm lg:px-layout-lg'></div>
  const contentElement = useGlass ? (
    <div className={twMerge('', className)}>
      <div className='relative flex h-fit w-fit justify-end rounded-card'>
        <div className='backdrop-glass z-0 h-full w-full' />
        <div
          className={twMerge(
            `z-1 rounded-[inherit] px-6 py-4 *:relative *:z-1 lg:px-8 lg:py-6 ${contentAlignmentUtility[contentAlignment]}`,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={twMerge(
        `mx-auto max-w-content ${contentPx} ${contentAlignmentUtility[contentAlignment]}`,
        className,
      )}
    >
      {children}
    </div>
  )

  return (
    <Component
      className={twMerge(
        `@container-size relative h-full w-full bg-center bg-cover bg-no-repeat [container:inline-size]`,
        useAnimation && isLargerDisplays ? `bg-fixed` : 'bg-local',
        _darkGradient && 'dark',
        className,
      )}
      style={{ backgroundImage: `url(${url})` } as CSSProperties}
      ref={ref}
    >
      <div
        className={twMerge(
          `py-[25cqb] ${animatedScrimGradient} `,
          useAnimation && 'animate-timeline',
          scrimClassName,
        )}
      >
        {contentElement}
      </div>
    </Component>
  )
}
