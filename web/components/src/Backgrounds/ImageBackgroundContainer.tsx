import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/index'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'

type ImageBackgroundContainerProps = {
  scrimClassName?: string
  /* On mobile dont split background image and content */
  dontSplit?: boolean
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
      dontSplit = false,
    },
    ref,
  ) {
    const props = useSanityLoader(image, DEFAULT_MAX_WIDTH, undefined)
    const src = props?.src
    const isMobile = useMediaQuery(`(max-width: 800px)`)

    const fadedFilter = `
    before:content-['']
    before:absolute
    before:inset-0
    ${useLight ? `before:bg-white-100 before:opacity-[35%]` : `before:bg-black-100 before:opacity-[25%]`}
    `

    const backgroundClassNames = twMerge(
      `[container:inline-size]
      relative
      ${useLight ? '' : 'dark'}
      w-full
      ${useAnimation && !isMobile ? `bg-fixed ${fadedFilter}` : 'bg-local'}
      bg-center
      bg-no-repeat
      bg-cover
    `,
      className,
    )

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

    const animatedScrimGradient = useLight
      ? `${lightGradientForContentAlignment[contentAlignment]}`
      : `black-center-gradient ${darkGradientForContentAlignment[contentAlignment]}`

    return useAnimation && !isMobile ? (
      <div
        ref={ref}
        className={backgroundClassNames}
        style={
          {
            backgroundImage: `url(${src})`,
            '--color-on-background': `var(--inverted-text)`,
          } as CSSProperties
        }
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
          {children}
        </div>
      </div>
    ) : isMobile && !dontSplit ? (
      <div ref={ref}>
        <div
          className={twMerge(`aspect-video`, backgroundClassNames)}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
        {children}
      </div>
    ) : (
      <div
        ref={ref}
        className={backgroundClassNames}
        style={{
          backgroundImage: `url(${src})`,
        }}
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
          {children}
        </div>
      </div>
    )
  },
)
