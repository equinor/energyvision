import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/types'
import { twMerge } from 'tailwind-merge'
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery'

type ImageBackgroundContainerProps = ImageBackground & HTMLAttributes<HTMLDivElement>
const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer(
    { image, useAnimation = false, contentAlignment = 'center', children, className },
    ref,
  ) {
    const props = useSanityLoader(image, DEFAULT_MAX_WIDTH, undefined)
    const isMobile = useMediaQuery(`(max-width: 750px)`)
    const src = props?.src

    const backgroundClassNames = twMerge(
      `[container:inline-size]
      dark
      w-full
      ${useAnimation ? 'bg-fixed' : 'bg-local py-40 lg:py-52'}
      bg-center
      bg-no-repeat
      bg-cover
    `,
      className,
    )

    return useAnimation ? (
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
          lg:py-[33dvh]
          bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))]
          ${
            contentAlignment !== 'center'
              ? `${
                  contentAlignment === 'right'
                    ? 'xl:bg-[linear-gradient(to_right,rgba(0,0,0,0.1),rgba(0,0,0,0.3)_30%,rgba(0,0,0,0.4)_50%)]'
                    : 'xl:bg-[linear-gradient(to_left,rgba(0,0,0,0.1),rgba(0,0,0,0.3)_30%,rgba(0,0,0,0.4)_50%)]'
                }`
              : ``
          }
          animate-timeline
      `}
        >
          {children}
        </div>
      </section>
    ) : (
      <section
        ref={ref}
        className={backgroundClassNames}
        style={{
          backgroundImage: `
          ${
            contentAlignment !== 'center' && !isMobile
              ? `${
                  contentAlignment === 'right'
                    ? `linear-gradient(to right,rgba(0,0,0,0.1),rgba(0,0,0,0.3) 30%,rgba(0,0,0,0.4) 50%)`
                    : `linear-gradient(to left,rgba(0,0,0,0.1),rgba(0,0,0,0.3) 30%,rgba(0,0,0,0.4) 50%)`
                }`
              : `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))`
          },url(${src})`,
        }}
      >
        {children}
      </section>
    )
  },
)
