import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/index'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'

type ImageBackgroundContainerProps = ImageBackground & HTMLAttributes<HTMLDivElement>
const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer(
    { image, useAnimation = false, useLight = false, contentAlignment = 'center', children, className },
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

    const animatedScrimGradient = useLight
      ? `white-center-gradient ${
          contentAlignment !== 'center'
            ? `${contentAlignment === 'right' ? 'xl:white-right-gradient' : 'xl:white-left-gradient'}`
            : ``
        }`
      : `black-center-gradient ${
          contentAlignment !== 'center'
            ? `${contentAlignment === 'right' ? 'xl:black-right-gradient' : 'xl:black-left-gradient'}`
            : ``
        }`

    return useAnimation && !isMobile ? (
      <section
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
          className={`
          py-40 
          lg:py-[25dvh]
          ${animatedScrimGradient}
          animate-timeline
          relative
      `}
        >
          {children}
        </div>
      </section>
    ) : isMobile ? (
      <section ref={ref}>
        <div
          className={`${backgroundClassNames} aspect-video`}
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
        {children}
      </section>
    ) : (
      <section
        ref={ref}
        className={`${backgroundClassNames}`}
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        {/** Scrim */}
        <div
          className={`
          py-40 
          lg:py-52
          relative
          ${animatedScrimGradient}`}
        >
          {children}
        </div>
      </section>
    )
  },
)
