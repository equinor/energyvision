import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/types'
import { twMerge } from 'tailwind-merge'

type ImageBackgroundContainerProps = ImageBackground & HTMLAttributes<HTMLDivElement>
const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer(
    { image, useAnimation = false, contentAlignment = 'center', children, className, ...rest },
    ref,
  ) {
    const props = useSanityLoader(image, DEFAULT_MAX_WIDTH, undefined)
    const src = props?.src

    const contentAlignments = {
      center: 'justify-center',
      right: 'justify-start',
      left: 'justify-end',
    }

    const contentClassNames = `
    flex
    justify-center
    items-center
    lg:${contentAlignments[contentAlignment]}
    `

    const backgroundClassNames = twMerge(
      `[container:inline-size]
      dark
      w-full
      ${useAnimation ? 'bg-fixed' : 'bg-local py-40 lg:py-52'}
      bg-center
      bg-no-repeat
      bg-cover
      ${contentClassNames}
    `,
      className,
    )

    return useAnimation ? (
      <section
        ref={ref}
        {...rest}
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
          animate-timeline
      `}
        >
          {children}
        </div>
      </section>
    ) : (
      <section
        ref={ref}
        {...rest}
        className={backgroundClassNames}
        style={{
          backgroundImage: `
        linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),
        url(${src})`,
        }}
      >
        {children}
      </section>
    )
  },
)
