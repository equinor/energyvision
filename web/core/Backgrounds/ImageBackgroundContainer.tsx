'use client'
import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { BackgroundContainerType } from './ColouredContainer'
import { ImageRatioKeys, mapSanityImageRatio } from '@core/SanityImage/SanityImage'

type ImageBackgroundContainerProps = {
  scrimClassName?: string
  /* On mobile dont split background image and content */
  dontSplit?: boolean
  /* Provide gradient in scrimClassname and disable default */
  overrideGradient?: boolean
  aspectRatio?: ImageRatioKeys
  /** Set return element as given */
  as?: BackgroundContainerType
} & ImageBackground &
  HTMLAttributes<HTMLDivElement>
const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer(
    {
      image,
      useAnimation = false,
      useLight = false,
      contentAlignment = 'center',
      children,
      className = '',
      scrimClassName = '',
      overrideGradient = false,
      dontSplit = false,
      aspectRatio,
      as = 'div',
      ...rest
    },
    ref,
  ) {
    const props = useSanityLoader(image, DEFAULT_MAX_WIDTH, mapSanityImageRatio(aspectRatio ?? '9:16'))
    const src = props?.src
    const isMobile = useMediaQuery(`(max-width: 800px)`)
    const ReturnElement = as

    const fadedFilter = `
    before:content-['']
    before:absolute
    before:inset-0
    ${useLight ? `before:bg-white-100 before:opacity-[35%]` : `before:bg-black-100 before:opacity-[25%]`}
    `

    const backgroundClassNames = `[container:inline-size]
      relative
      ${useLight ? '' : 'dark'}
      w-full
      h-full
      ${useAnimation && !isMobile ? `bg-fixed ${fadedFilter}` : 'bg-local'}
      bg-center
      bg-no-repeat
      bg-cover
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
      right: 'xl:black-right-gradient',
      left: 'xl:black-left-gradient',
      'bottom-left': 'black-to-top-gradient',
      'bottom-center': 'black-to-top-gradient',
    }

    let animatedScrimGradient = ''
    if (!overrideGradient) {
      animatedScrimGradient = useLight
        ? `${lightGradientForContentAlignment[contentAlignment]}`
        : `black-center-gradient ${darkGradientForContentAlignment[contentAlignment]}`
    }

    return useAnimation && !isMobile ? (
      <ReturnElement
        ref={ref}
        className={backgroundClassNames}
        style={
          {
            backgroundImage: `url(${src})`,
          } as CSSProperties
        }
        {...rest}
      >
        {/** Scrim */}
        <div
          className={twMerge(
            `py-40
            lg:py-[25dvh]
            ${animatedScrimGradient}
            animate-timeline
            relative`,
            scrimClassName,
          )}
        >
          <div className={className}>{children}</div>
        </div>
      </ReturnElement>
    ) : isMobile && !dontSplit ? (
      <ReturnElement ref={ref} {...rest}>
        <div
          className={twMerge(`aspect-video`, backgroundClassNames)}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
        <div className={className}>{children}</div>
      </ReturnElement>
    ) : (
      <ReturnElement
        ref={ref}
        className={`${backgroundClassNames} `}
        style={{
          backgroundImage: `url(${src})`,
        }}
        {...rest}
      >
        {/** Scrim */}
        <div
          className={twMerge(
            `h-full
            py-40
            lg:py-52
            relative
            ${animatedScrimGradient}`,
            scrimClassName,
          )}
        >
          <div className={className}>{children}</div>
        </div>
      </ReturnElement>
    )
  },
)
