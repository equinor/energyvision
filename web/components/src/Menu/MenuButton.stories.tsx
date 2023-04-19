/* eslint-disable */
import type { StoryFn, Meta } from '@storybook/react'
import { MenuButton, MenuButtonProps } from '@components'

export default {
  title: 'Components/Menu/MenuButton',
  component: MenuButton,

  parameters: {
    docs: {
      description: {
        component: `Button for toggling the menu.
        `,
      },
    },
  },
} as Meta

export const Default: StoryFn<MenuButtonProps> = (args) => <MenuButton {...args} title="Menu"></MenuButton>

Default.storyName = 'Default'

export const Open: StoryFn<MenuButtonProps> = () => <MenuButton expanded title="Menu"></MenuButton>

Open.storyName = 'Open menu'

export const WithAria: StoryFn<MenuButtonProps> = () => (
  <>
    <MenuButton aria-expanded={false} title="Menu"></MenuButton>
    <MenuButton aria-expanded={true} expanded title="Menu"></MenuButton>
  </>
)

WithAria.storyName = 'With aria-expanded'
WithAria.parameters = {
  docs: {
    storyDescription: `It's important to use the aria-expanded prop for menu status`,
  },
}
