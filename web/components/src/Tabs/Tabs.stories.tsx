import { useState } from 'react'
import type { StoryFn, Meta } from '@storybook/react'
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

export const Default: StoryFn<TabsProps> = (args) => (
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

export const WithDarkBackground: StoryFn<TabsProps> = () => (
  <BackgroundContainer background="Slate Blue">
    <Tabs>
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
  </BackgroundContainer>
)

WithDarkBackground.storyName = 'With a dark background'

export const ControlledTabs: StoryFn<TabsProps> = () => {
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

export const WithLongNames: StoryFn<TabsProps> = () => (
  <Tabs>
    <Tabs.TabList>
      <Tabs.Tab>My tab number one</Tabs.Tab>
      <Tabs.Tab>My tab number two</Tabs.Tab>
      <Tabs.Tab>My tab number three</Tabs.Tab>
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

WithLongNames.storyName = 'With long names'
