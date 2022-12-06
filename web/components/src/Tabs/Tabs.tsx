import { forwardRef } from 'react'

import { Tabs as CTabs } from '@chakra-ui/react'
import { Tabs as RTabs, TabsProps as RTabsProps } from '@reach/tabs'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type ChakraTabsProps = {
  align?: 'center' | 'end' | 'start'
  colorScheme?: string
  defaultIndex?: number
  direction?: 'ltr' | 'rtl'
  id?: string
  index?: number
  isFitted?: boolean
  isLazy?: boolean
  isManual?: boolean
  lazyBehaviour?: any
  onChange?: (index: number) => void
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'line' | 'enclosed' | 'enclosed-colored' | 'soft-rounded' | 'solid-rounded' | 'unstyled'
  inverted?: boolean
  children: React.ReactNode
}

export type TabsProps = RTabsProps

export const Tabs = Flags.IS_DEV
  ? forwardRef<HTMLDivElement, ChakraTabsProps>(function Tabs({ children, ...rest }, ref) {
      return (
        <CTabs ref={ref} {...rest}>
          {children}
        </CTabs>
      )
    })
  : forwardRef<HTMLDivElement, TabsProps>(function Tabs({ children, ...rest }, ref) {
      return (
        <RTabs ref={ref} {...rest}>
          {children}
        </RTabs>
      )
    })
