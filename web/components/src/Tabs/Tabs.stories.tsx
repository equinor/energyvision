import { Story, Meta } from '@storybook/react/types-6-0'
import { Tabs, TabsProps, Text } from '@components'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: {
    Tab: Tabs.Tab,
    TabList: Tabs.TabList,
    TabPanel: Tabs.TabPanel,
    TabPanels: Tabs.TabPanels,
  },
} as Meta

export const Default: Story<TabsProps> = (args) => (
  <Tabs {...args}>
    <Tabs.TabList>
      <Tabs.Tab>One</Tabs.Tab>
      <Tabs.Tab>Two</Tabs.Tab>
      <Tabs.Tab>Three</Tabs.Tab>
    </Tabs.TabList>
    <Tabs.TabPanels>
      <Tabs.TabPanel>
        <Text>One content</Text>
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <Text>Two content</Text>
      </Tabs.TabPanel>
      <Tabs.TabPanel>
        <Text>Three content</Text>
      </Tabs.TabPanel>
    </Tabs.TabPanels>
  </Tabs>
)
