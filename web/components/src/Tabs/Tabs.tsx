import { forwardRef } from 'react'

import { Tabs as CTabs, TabsProps as CTabsProps } from '@chakra-ui/react'
import { Tabs as RTabs, TabsProps as RTabsProps } from '@reach/tabs'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type ChakraTabsProps = CTabsProps

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
