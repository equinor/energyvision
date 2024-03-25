import { forwardRef, HTMLAttributes, CSSProperties } from 'react'
import Script from 'next/script'
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
      ${useAnimation ? 'bg-fixed' : 'bg-local py-24'}
      bg-center
      bg-no-repeat
      bg-cover
      ${contentClassNames}
    `,
      className,
    )

    return useAnimation ? (
      <>
        <Script
          src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"
          strategy="lazyOnload"
          onLoad={() => console.log(`scroll olyfill loaded correctly`)}
        />
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
          w-full
          py-24 
          lg:py-[33dvh]
          dark
          animate-fade-in-out 
          [animation-timeline:view()] 
          [animation-range:_entry_40%_cover_90%]
          bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))]
      `}
          >
            {children}
          </div>
        </section>
      </>
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
