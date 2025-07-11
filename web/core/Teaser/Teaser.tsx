import { BackgroundContainer, BackgroundContainerProps } from '@core/Backgrounds'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type ImageSize = 'small' | 'full'
export type ImagePosition = 'left' | 'right'

export const Teaser = forwardRef<HTMLDivElement, BackgroundContainerProps>(function Teaser(
  { children, className, ...rest },
  ref,
) {
  return (
    <BackgroundContainer as="article" backgroundStyle="none" ref={ref} {...rest}>
      <div
        className={twMerge(
          `overflow-y-hidden max-w-[1440px] grid md:grid-cols-2 auto-rows-min my-0 mx-auto `,
          className,
        )}
      >
        {children}
      </div>
    </BackgroundContainer>
  )
})
