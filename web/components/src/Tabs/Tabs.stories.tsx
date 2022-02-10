import { useState } from 'react'
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

WithDarkBackground.storyName = 'With a dark background'

export const ControlledTabs: Story<TabsProps> = () => {
  const [tabIndex, setTabIndex] = useState(1)

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabIndex(parseInt(event.target.value, 10))
  }
  function handleTabsChange(index: number) {
    setTabIndex(index)
  }

  return (
    <>
      <input type="range" min="0" max="2" value={tabIndex} onChange={handleSliderChange} />
      <Tabs index={tabIndex} onChange={handleTabsChange}>
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
    </>
  )
}

ControlledTabs.storyName = 'Controlled tabs'
ControlledTabs.parameters = {
  docs: {
    storyDescription: `An tabs could be controlled and have items open by default`,
  },
}
