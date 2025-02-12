import { BackgroundContainer, BackgroundContainerProps } from '@components/Backgrounds'
import { ReactNode } from 'react'
import envisTwMerge from '../../twMerge'

type Props = {
  variant?: 'light' | 'dark'
  right?: string
  children: ReactNode
} & BackgroundContainerProps

export const TopbarDropdown = ({ children, variant = 'light', className = '', ...rest }: Props) => {
  return (
    <BackgroundContainer
      background={{
        type: 'backgroundColor',
        backgroundUtility: variant === 'dark' ? 'slate-blue-95' : 'white-100',
        dark: variant === 'dark',
      }}
      className={envisTwMerge(`fixed overflow-auto inset-0`, className)}
      {...rest}
    >
      {children}
    </BackgroundContainer>
  )
}
