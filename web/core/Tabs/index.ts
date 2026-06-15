import { Tab, type TabProps } from './Tab'
import { TabList, type TabListProps } from './TabList'
import { TabPanel, type TabPanelProps } from './TabPanel'
import { type TabsProps, Tabs as TabsWrapper } from './Tabs'

type TabsCompoundProps = typeof TabsWrapper & {
  TabList: typeof TabList
  Tab: typeof Tab
  TabPanel: typeof TabPanel
}

const Tabs = TabsWrapper as TabsCompoundProps

Tabs.TabList = TabList
Tabs.Tab = Tab
Tabs.TabPanel = TabPanel

export { Tabs }
export type { TabsProps, TabListProps, TabProps, TabPanelProps }
