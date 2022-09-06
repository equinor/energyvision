/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { BackgroundContainer, BackgroundContainerProps, Text, Heading } from '@components'
import styled from 'styled-components'

const Content = styled.div`
  padding: 2em;
`

export default {
  title: 'Components/BackgroundContainer',
  component: BackgroundContainer,
  viewMode: 'story',
  parameters: {
    docs: {
      description: {
        component: `The background container is meant to be used for coloured backgrounds. The purpose is to consolidate the usage of background colours and avoid duplication.`,
      },
    },
  },
} as Meta

export const Default: Story<BackgroundContainerProps> = (args) => (
  <BackgroundContainer {...args}>
    <Content>
      <Heading>Content</Heading>
      <Text>This is content inside a background container.</Text>
      <Text>
        Content that uses the <code>Text</code> and <code>Heading</code> components will automatically invert their text
        colour if "Slate Blue" is selected as background colour.
      </Text>
    </Content>
  </BackgroundContainer>
)

Default.storyName = 'Default'
