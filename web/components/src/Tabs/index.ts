import { Tabs as TabsWrapper, TabsProps } from './Tabs'
import { TabList, TabListProps } from './TabList'
import { Tab, TabProps } from './Tab'
import { TabPanel, TabPanelProps } from './TabPanel'
import { TabPanels, TabPanelsProps } from './TabPanels'

type TabsCompoundProps = typeof TabsWrapper & {
  TabList: typeof TabList
  Tab: typeof Tab
  TabPanel: typeof TabPanel
  TabPanels: typeof TabPanels
}

const Tabs = TabsWrapper as TabsCompoundProps

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanel = TabPanel
Tabs.TabPanels = TabPanels

export { Tabs }
export type { TabsProps, TabListProps, TabProps, TabPanelProps, TabPanelsProps }
