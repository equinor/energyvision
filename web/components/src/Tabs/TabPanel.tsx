import { forwardRef } from 'react'
import { TabPanel as RTabPanel, TabPanelProps as RTabPanelProps } from '@reach/tabs'
import { TabPanel as CTabPanel, TabPanelProps as CTabPanelProps } from '@chakra-ui/react'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type TabPanelProps = RTabPanelProps

export type ChakraTabPanelProps = CTabPanelProps

export const TabPanel = Flags.IS_DEV
  ? forwardRef<HTMLDivElement, ChakraTabPanelProps>(function TabPanel({ children, ...rest }, ref) {
      return (
        <CTabPanel ref={ref} {...rest}>
          {children}
        </CTabPanel>
      )
    })
  : forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel({ children, ...rest }, ref) {
      return (
        <RTabPanel ref={ref} {...rest}>
          {children}
        </RTabPanel>
      )
    })
