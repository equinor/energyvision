'use client'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useRef,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import type { Image, ImageRatioKeys } from '@/core/Image/Image'
import { resolveImage } from '@/sanity/lib/utils'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import type { ContentAlignmentTypes } from '../../types/index'

export type ImageBackground = {
  image: Image
  useAnimation?: boolean
  useLight?: boolean
  useNoGradient?: boolean
  useGlass?: boolean
  contentAlignment?: ContentAlignmentTypes
}

type ImageBackgroundContainerProps = {
  scrimClassName?: string
  /* On mobile dont split background image and content */
  dontSplit?: boolean
  /* Provide gradient in scrimClassname and disable default */
  overrideGradient?: boolean
  aspectRatio?: ImageRatioKeys
  /** Set return element as given */
  as?: ElementType
} & ImageBackground &
  HTMLAttributes<HTMLElement>

export const ImageBackgroundContainer = ({
  image,
  useAnimation = false,
  useLight = false,
  useNoGradient = false,
  useGlass = false,
  contentAlignment = 'center',
  children,
  className = '',
  scrimClassName = '',
  overrideGradient = false,
  dontSplit = false,
  as,
}: ImageBackgroundContainerProps) => {
  const isLargerDisplays = useMediaQuery(`(min-width: 800px)`)

  const { url } = resolveImage({
    image,
    grid: 'full',
    isLargerDisplays,
  })
  const Component = as ?? 'section'

  /*   const fadedFilter = `
    before:content-['']
    before:absolute
    before:inset-0
    ${useLight ? `before:bg-white-100 before:opacity-[35%]` : `before:bg-black-100 before:opacity-[25%]`}
    ` */

  const backgroundClassNames = `
      [container:inline-size]
      relative
      ${useLight || useNoGradient ? '' : 'dark'}
      w-full
      h-full
      ${useAnimation && isLargerDisplays ? `bg-fixed` : 'bg-local'}
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
  if (!overrideGradient && !useNoGradient) {
    animatedScrimGradient = useLight
      ? `${lightGradientForContentAlignment[contentAlignment]}`
      : `black-center-gradient ${darkGradientForContentAlignment[contentAlignment]}`
  }
  const ref = useRef(null)
  const [opacity, setOpacity] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const opacityTransformed = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [0, 1, 1, 0],
  )
  useMotionValueEvent(opacityTransformed, 'change', latest => {
    setOpacity(latest)
  })

  const contentElement = useGlass ? (
    <div className={twMerge('', className)}>
      <div className='relative flex h-fit w-fit justify-end rounded-card'>
        <div className='backdrop-glass z-0 h-full w-full' />
        <div
          className={
            'z-1 rounded-[inherit] px-6 py-4 *:relative *:z-1 lg:px-8 lg:py-6'
          }
        >
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className={className}>{children}</div>
  )

  const props = {
    ref,
  }

  if (useAnimation && isLargerDisplays) {
    return (
      <Component
        className={backgroundClassNames}
        style={
          {
            backgroundImage: `url(${url})`,
          } as CSSProperties
        }
        {...props}
      >
        {/** Scrim */}
        <motion.div
          style={{
            opacity: opacity,
          }}
          className={twMerge(
            `py-40 lg:py-[25dvh] ${animatedScrimGradient} relative`,
            scrimClassName,
          )}
        >
          {contentElement}
        </motion.div>
      </Component>
    )
  }
  if (!isLargerDisplays && !dontSplit) {
    return (
      <Component {...props}>
        <div
          className={twMerge(`aspect-4/3`, backgroundClassNames)}
          style={{
            backgroundImage: `url(${url})`,
          }}
        />
        {contentElement}
      </Component>
    )
  }
  return (
    <Component
      className={`${backgroundClassNames} `}
      style={{
        backgroundImage: `url(${url})`,
      }}
      {...props}
    >
      {/** Scrim */}
      <div
        className={twMerge(
          `relative h-full py-40 lg:py-52 ${animatedScrimGradient}`,
          scrimClassName,
        )}
      >
        {contentElement}
      </div>
    </Component>
  )
}
