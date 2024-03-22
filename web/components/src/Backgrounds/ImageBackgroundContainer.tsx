import { forwardRef, HTMLAttributes } from 'react'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import { ImageBackground } from '../../../types/types'
import { twMerge } from 'tailwind-merge'

type ImageBackgroundContainerProps = {
  useScrollAnimation?: boolean
} & ImageBackground &
  HTMLAttributes<HTMLDivElement>

const DEFAULT_MAX_WIDTH = 1920

export const ImageBackgroundContainer = forwardRef<HTMLDivElement, ImageBackgroundContainerProps>(
  function ImageBackgroundContainer(
    { image, contentAlignment = 'center', useScrollAnimation = false, children, className, ...rest },
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
      ${useScrollAnimation ? 'bg-fixed py-24 lg:py-[33dvh]' : 'bg-local py-24'}
      bg-center
      bg-no-repeat
      bg-cover
      ${contentClassNames}
    `,
      className,
    )

    return useScrollAnimation ? (
      <section
        ref={ref}
        {...rest}
        className={backgroundClassNames}
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url(${src})`,
        }}
      >
        <div
          className={`
          dark
          animate-zoom-in 
          [animation-timeline:view()] 
          [animation-range:_entry_25%_cover_100%]
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
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url(${src})`,
        }}
      >
        {children}
      </section>
    )
  },
)
