import { Story, Meta } from '@storybook/react/types-6-0'
import { Tabs, TabsProps, Text, BackgroundContainer } from '@components'

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

export const WithDarkBackground: Story<TabsProps> = () => (
  <BackgroundContainer background="Slate Blue">
    <Tabs>
      <Tabs.TabList>
        <Tabs.Tab inverted>One</Tabs.Tab>
        <Tabs.Tab inverted>Two</Tabs.Tab>
        <Tabs.Tab inverted>Three</Tabs.Tab>
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
  </BackgroundContainer>
)
