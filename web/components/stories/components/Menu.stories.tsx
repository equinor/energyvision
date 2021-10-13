import { Story, Meta } from '@storybook/react'
import { Menu, MenuProps } from '@components'
import styled from 'styled-components'

export default {
  title: 'Components/Menu/Menu',
  component: Menu,
  subcomponents: {
    SubMenu: Menu.SubMenu,
    SubMenuHeader: Menu.SubMenuHeader,
    SubMenuPanel: Menu.SubMenuPanel,
  },
  parameters: {
    docs: {
      description: {
        component: `Main site navigation.
        `,
      },
    },
  },
} as Meta

const Wrapper = styled.div`
  height: 300px;
`

export const Default: Story<MenuProps> = (args) => (
  <Wrapper>
    <Menu {...args}>
      <Menu.SubMenu>
        <Menu.SubMenuHeader>Menu item 1</Menu.SubMenuHeader>
        <Menu.SubMenuPanel>Menu content 1</Menu.SubMenuPanel>
      </Menu.SubMenu>
      <Menu.SubMenu>
        <Menu.SubMenuHeader>Menu item 2</Menu.SubMenuHeader>
        <Menu.SubMenuPanel>Menu content 2</Menu.SubMenuPanel>
      </Menu.SubMenu>
      <Menu.SubMenu>
        <Menu.SubMenuHeader>Menu item 3</Menu.SubMenuHeader>
        <Menu.SubMenuPanel>Menu content 3</Menu.SubMenuPanel>
      </Menu.SubMenu>
    </Menu>
  </Wrapper>
)

Default.storyName = 'Default'
