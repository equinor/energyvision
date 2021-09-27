/* eslint-disable */
import { Story, Meta } from '@storybook/react'
import { MenuButton, MenuButtonProps } from '@components'

export default {
  title: 'Components/Menu',
  component: MenuButton,

  parameters: {
    docs: {
      description: {
        component: `Main site navigation.
        `,
      },
    },
  },
} as Meta

export const Default: Story<MenuButtonProps> = (args) => <MenuButton {...args}></MenuButton>

Default.storyName = 'Default'
