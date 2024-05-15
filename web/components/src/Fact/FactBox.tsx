import { forwardRef, HTMLAttributes } from 'react'
import type { FactImagePosition } from './'
import { BackgroundColours } from '../../../types/types'
import { ColorKeyTokens } from '../../../styles/colorKeyToUtilityMap'
import { BackgroundContainer, BackgroundContainerProps } from '@components'
import { twMerge } from 'tailwind-merge'

export type FactProps = {
  background?: string
  backgroundUtility?: string
  dark?: boolean
  imagePosition?: FactImagePosition
  useTwoColumns?: boolean
} & HTMLAttributes<HTMLDivElement>

export const FactBox = forwardRef<HTMLDivElement, FactProps>(function FactBox(
  {
    background = 'White',
    backgroundUtility = 'white-100',
    dark,
    useTwoColumns = false,
    imagePosition = 'left',
    children,
    className = '',
    ...rest
  },
  ref,
) {
  const bgProps: BackgroundContainerProps = {
    background: {
      dark: dark,
      backgroundUtility: backgroundUtility as keyof ColorKeyTokens,
      backgroundColor: background as BackgroundColours,
      type: 'backgroundColor',
    },
  }

  return (
    <BackgroundContainer {...rest} className={twMerge(`w-full flex mt-24 mb-24`, className)} {...bgProps} ref={ref}>
      <div
        className={twMerge(
          `w-full flex flex-col justify-center ${
            useTwoColumns
              ? `lg:grid grid-rows-1 ${imagePosition === 'right' ? 'lg:grid-cols-[60%_40%]' : 'lg:grid-cols-[40%_60%]'}`
              : ''
          }`,
          className,
        )}
      >
        {children}
      </div>
    </BackgroundContainer>
  )
})
