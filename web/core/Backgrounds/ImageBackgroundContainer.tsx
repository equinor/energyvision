'use client'
import { forwardRef, HTMLAttributes, CSSProperties, ElementType, useRef, useEffect, useState } from 'react'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../types/index'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '../../lib/hooks/useMediaQuery'
import { ImageRatioKeys, mapSanityImageRatio } from '@/core/SanityImage/SanityImage'
import { motion, useTransform, useScroll, useMotionValueEvent } from 'framer-motion'

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
const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = ({
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
  as = 'section',
  ...rest
}: ImageBackgroundContainerProps) => {
  const props = useSanityLoader(image, DEFAULT_MAX_WIDTH, mapSanityImageRatio(aspectRatio ?? '16:9'))
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
  const ref = useRef(null)
  const [opacity, setOpacity] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const opacityTransformed = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0])
  useMotionValueEvent(opacityTransformed, 'change', (latest) => {
    setOpacity(latest)
  })
  if (useAnimation && !isMobile) {
    return (
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
        <motion.div
          style={{
            opacity: opacity,
          }}
          className={twMerge(`py-40 lg:py-[25dvh] ${animatedScrimGradient} relative`, scrimClassName)}
        >
          <div className={className}>{children}</div>
        </motion.div>
      </ReturnElement>
    )
  } else if (isMobile && !dontSplit) {
    return (
      <ReturnElement {...rest}>
        <div
          className={twMerge(`aspect-video`, backgroundClassNames)}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
        <div className={className}>{children}</div>
      </ReturnElement>
    )
  } else {
    return (
      <ReturnElement
        className={`${backgroundClassNames} `}
        style={{
          backgroundImage: `url(${src})`,
        }}
        {...rest}
      >
        {/** Scrim */}
        <div className={twMerge(`relative h-full py-40 lg:py-52 ${animatedScrimGradient}`, scrimClassName)}>
          <div className={className}>{children}</div>
        </div>
      </ReturnElement>
    )
  }
}
