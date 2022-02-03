/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { BackgroundContainer, BackgroundContainerProps } from '@components'

export default {
  title: 'Components/BackgroundContainer',
  component: BackgroundContainer,
  viewMode: 'story',
  parameters: {
    docs: {
      description: {
        component: `🚧 &nbsp; Work in progress to avoid duplicating the background colour styles. 
        `,
      },
    },
  },
} as Meta

export const Default: Story<BackgroundContainerProps> = (args) => (
  <BackgroundContainer {...args}>Content</BackgroundContainer>
)

Default.storyName = 'Default'
