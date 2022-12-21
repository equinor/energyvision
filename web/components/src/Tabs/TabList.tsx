import { forwardRef } from 'react'
import { TabList as CTabList, TabListProps as CTabListProps } from '@chakra-ui/react'
import { TabList as RTabList, TabListProps as RTabListProps } from '@reach/tabs'
import { Flags } from '../../../common/helpers/datasetHelpers'

export type TabListProps = RTabListProps

export type ChakraTabListProps = CTabListProps

export const TabList = Flags.IS_DEV
  ? forwardRef<HTMLDivElement, ChakraTabListProps>(function TabList({ children, ...rest }, ref) {
      return (
        <CTabList ref={ref} {...rest} style={{ border: 'none', flexWrap: 'wrap' }}>
          {children}
        </CTabList>
      )
    })
  : forwardRef<HTMLDivElement, TabListProps>(function TabList({ children, ...rest }, ref) {
      return (
        <RTabList ref={ref} {...rest}>
          {children}
        </RTabList>
      )
    })
