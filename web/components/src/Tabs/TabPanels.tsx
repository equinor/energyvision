import { forwardRef } from 'react'
import { TabPanels as RTabPanels, TabPanelsProps as RTabPanelsProps } from '@reach/tabs'
import { TabPanels as CTabPanels, TabPanelsProps as CTabPanelsProps } from '@chakra-ui/react'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type TabPanelsProps = RTabPanelsProps

export type ChakraTabPanelsProps = CTabPanelsProps

export const TabPanels = Flags.IS_DEV
  ? forwardRef<HTMLDivElement, ChakraTabPanelsProps>(function TabPanels({ children, ...rest }, ref) {
      return (
        <CTabPanels ref={ref} {...rest}>
          {children}
        </CTabPanels>
      )
    })
  : forwardRef<HTMLDivElement, TabPanelsProps>(function TabPanels({ children, ...rest }, ref) {
      return (
        <RTabPanels ref={ref} {...rest}>
          {children}
        </RTabPanels>
      )
    })
